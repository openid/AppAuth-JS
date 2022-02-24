import {AuthorizationListener, AuthorizationNotifier, AuthorizationRequest, AuthorizationServiceConfiguration, BaseTokenRequestHandler, FetchRequestor, GRANT_TYPE_AUTHORIZATION_CODE, RedirectRequestHandler, RevokeTokenRequest, TokenRequest, TokenResponse} from './index'
import type {AxiosInstance} from 'axios';
import {log} from './logger';

interface Config {
  client_id: string, redirect_uri: string, issuer: string, scope: string, extra?: any,
      onToken?: (token: TokenResponse) => any
}

export class MedblocksAuth {
  private config: Config;
  private notifier = new AuthorizationNotifier();
  private authHandler = new RedirectRequestHandler();
  private tokenHandler = new BaseTokenRequestHandler(new FetchRequestor());
  private authServiceConfig?: AuthorizationServiceConfiguration;
  private requestor = new FetchRequestor();
  token?: TokenResponse;
  authRetryKey: string = 'auth-retry';

  constructor(config: Config) {
    this.config = config;
    this.notifier.setAuthorizationListener(this.authListner);
    this.authHandler.setAuthorizationNotifier(this.notifier);
  }

  public authListner: AuthorizationListener =
      async (req, res) => {
    if (res && req.internal) {
      console.log('triggering authListner');
      const extras: any = {};
      extras['code_verifier'] = req.internal['code_verifier'];
      const {client_id, redirect_uri} = this.config;
      const request = new TokenRequest({
        client_id,
        redirect_uri,
        grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
        code: res.code,
        refresh_token: undefined,
        extras: extras,
      });
      if (this.authServiceConfig) {
        const tokenResponse =
            await this.tokenHandler.performTokenRequest(this.authServiceConfig, request)
        window.history.pushState({}, '', redirect_uri)
        return tokenResponse
      };
    }
  }

  public authRequest =
      () => {
        const {client_id, redirect_uri} = this.config;
        let request = new AuthorizationRequest({
          client_id: client_id,
          redirect_uri: redirect_uri,
          scope: 'openid',
          response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
          state: undefined,
          extras: {...this.config.extra, 'response_mode': 'fragment'}
        });
        if (this.authServiceConfig) {
          this.authHandler.performAuthorizationRequest(this.authServiceConfig, request)
        }
      }

  public revoke =
      (token: string) => {
        if (this.authServiceConfig) {
          this.tokenHandler.performRevokeTokenRequest(
              this.authServiceConfig,
              new RevokeTokenRequest(
                  {token, client_id: this.config.client_id, token_type_hint: 'access_token'}))
        }
      }

  public getToken = async():
      Promise<TokenResponse> => {
        this.authServiceConfig = await AuthorizationServiceConfiguration.fetchFromIssuer(
            this.config.issuer, this.requestor);
        const token = await this.authHandler.completeAuthorizationRequestIfPossible();
        if (!token) {
          this.authRequest();
        }
        return token
      }

  signin =
      async () => {
    this.token = await this.getToken();
  }

  registerAxiosInterceptor = (instance: AxiosInstance): AxiosInstance => {
    instance.interceptors.request.use(async (config) => {
      if (!this.token) {
        log('No token in axios interceptor. Signing in.');
        await this.signin();
      } else {
        config.headers = {...config.headers, 'Authorization': `Bearer ${this.token.accessToken}`};
        return config;
      }
    }, (err: any) => Promise.resolve(err))

    instance.interceptors.response.use((response) => {return response}, async (error: any) => {
      if ([401, 403].includes(error.response?.status)) {
        if (localStorage.getItem(this.authRetryKey)) {
          log('Request already failed once. Rejecting request')
          localStorage.removeItem(this.authRetryKey);
          return Promise.reject(error);
        } else {
          log(`Request status ${error.response?.status}. Trying to sign in again.`)
          localStorage.setItem(this.authRetryKey, 'true');
          await this.signin();
        }
      }
    })
    return instance
  }
}