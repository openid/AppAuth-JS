import {AuthorizationListener, AuthorizationNotifier, AuthorizationRequest, AuthorizationServiceConfiguration, BaseTokenRequestHandler, GRANT_TYPE_AUTHORIZATION_CODE, RedirectRequestHandler, RevokeTokenRequest, TokenRequest, TokenResponse} from './index'
import type {AxiosInstance} from 'axios';
import {log} from './logger';
import {SessionStorageBackend} from './storage';

interface Config {
  client_id: string, redirect_uri: string, issuer?: string, scope: string, extra?: any,
      onToken?: (token: TokenResponse) => any, onRedirect?: (url: string) => void,
                        authorization_endpoint?:
                            string, revocation_endpoint?: string, token_endpoint?: string
}

export class MedblocksAuth {
  private config: Config;
  private notifier = new AuthorizationNotifier();
  private authHandler = new RedirectRequestHandler();
  private tokenHandler = new BaseTokenRequestHandler();
  private authServiceConfig?: AuthorizationServiceConfiguration;
  private storageBackend = new SessionStorageBackend()
  token?: TokenResponse;
  authRetryKey: string = 'medblocks-auth-retry';
  originalUrlKey: string = 'medblocks-auth-original-url'
  tokenKey: string = 'medblocks-auth-token'
  openidConfigKey: string = 'medblocks-auth-openid-config';
  onRedirect =
      (url: string) => {
        window.history.replaceState({}, '', url)
      }

  constructor(config: Config) {
    this.config = config;
    this.notifier.setAuthorizationListener(this.authListner);
    this.authHandler.setAuthorizationNotifier(this.notifier);
    if (config.onRedirect) {
      this.onRedirect = config.onRedirect
    }
  }

  public authListner: AuthorizationListener =
      async (req, res) => {
    if (res && req.internal) {
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
        const originalUrl = await this.storageBackend.getItem(this.originalUrlKey);
        this.onRedirect(originalUrl || redirect_uri)
        return tokenResponse
      };
    }
  }

  public authRequest =
      async () => {
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
      this.storageBackend.setItem(this.originalUrlKey, window.location.href)
          await this.authHandler.performAuthorizationRequest(this.authServiceConfig, request)
          // Waits for the page to redirect and come back.
          await new Promise(res => {});
    }
  }

  public revoke = (token: string) => {
    if (this.authServiceConfig) {
      this.tokenHandler.performRevokeTokenRequest(
          this.authServiceConfig,
          new RevokeTokenRequest(
              {token, client_id: this.config.client_id, token_type_hint: 'access_token'}))
    }
  };

  public getTokenFromSession = async():
      Promise<TokenResponse|undefined> => {
        const t = await this.storageBackend.getItem(this.tokenKey);
        return t ? JSON.parse(t) : undefined;
      }

  public setTokenFromSession = async(token: TokenResponse):
      Promise<void> => {
        return await this.storageBackend.setItem(this.tokenKey, JSON.stringify(token));
      }

  public init = async(force: boolean = false):
      Promise<void> => {
        const {authorization_endpoint, revocation_endpoint, token_endpoint} = this.config
        if (authorization_endpoint && revocation_endpoint && token_endpoint) {
          this.authServiceConfig = new AuthorizationServiceConfiguration(
              {authorization_endpoint, revocation_endpoint, token_endpoint});
        }
        else {
          if (!this.config.issuer) {
            throw new Error(
                'issuer or (authorization_endpoint, revocation_endpoint & token_endpoint) must be provided.')
          }
          this.authServiceConfig =
              await AuthorizationServiceConfiguration.fetchFromIssuer(this.config.issuer);
        }
        if (force) {
          this.token = undefined;
          await this.authRequest();
        }
        const tokenFromRedirect = await this.authHandler.completeAuthorizationRequestIfPossible();
        if (tokenFromRedirect) {
          await this.setTokenFromSession(tokenFromRedirect);
        }

        this.token = tokenFromRedirect || await this.getTokenFromSession()

        if (!this.token) {
          await this.authRequest();
        }
      }

  registerAxiosInterceptor = (instance: AxiosInstance): void => {
    instance.interceptors.request.use(async (config) => {
      if (!this.token) {
        await this.init()
      }
      config.headers = {...config.headers, 'Authorization': `Bearer ${this.token?.accessToken}`};
      return config;
    }, (err: any) => Promise.resolve(err))

    instance.interceptors.response.use((response) => {return response}, async (error: any) => {
      if ([401, 403].includes(error.response?.status)) {
        if (await this.storageBackend.getItem(this.authRetryKey)) {
          log('Request already failed once. Rejecting request')
              await this.storageBackend.removeItem(this.authRetryKey);
          return Promise.reject(error);
        } else {
          log(`Request status ${error.response?.status}. Trying to force sign in again.`)
              await this.storageBackend.setItem(this.authRetryKey, 'true');
          await this.init(true);
        }
      }
    })
  }
}