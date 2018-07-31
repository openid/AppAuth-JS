import {AuthorizationRequest} from './authorization_request';
import {AuthorizationRequestHandler} from './authorization_request_handler';
import {AuthorizationServiceConfiguration} from './authorization_service_configuration';
import {CodeVerifier} from './pkce_code_verifier';
import {RedirectRequestHandler} from './redirect_based_handler';
import {LocalStorageBackend, StorageBackend} from './storage';
import {TokenRequest} from './token_request';
import {BaseTokenRequestHandler, TokenRequestHandler} from './token_request_handler';
import {AUTHORIZATION_RESPONSE_HANDLE_KEY} from './types';
import {JQueryRequestor} from './xhr';

export class PKCETokenRequestHandler {
  verifier: CodeVerifier;
  authorizationHandler: AuthorizationRequestHandler;
  tokenHandler: TokenRequestHandler;
  configuration: AuthorizationServiceConfiguration;
  storageBackend: StorageBackend;

  constructor(
      authorizationHandler: AuthorizationRequestHandler,
      configuration: AuthorizationServiceConfiguration,
      storageBackend: StorageBackend = new LocalStorageBackend()) {
    this.verifier = new CodeVerifier();
    this.authorizationHandler = new RedirectRequestHandler();
    this.tokenHandler = new BaseTokenRequestHandler(new JQueryRequestor());
    this.configuration = configuration;
    this.storageBackend = storageBackend;
  }

  performPKCEAuthorizationCodeRequest(
      configuration: AuthorizationServiceConfiguration,
      request: AuthorizationRequest) {
    request.setExtrasField('code_verifier', this.verifier.verifier);
    this.authorizationHandler.performAuthorizationRequest(configuration, request);
  }

  performPKCEAuthorizationTokenRequest(
      configuration: AuthorizationServiceConfiguration,
      request: TokenRequest) {
    this.storageBackend.getItem(AUTHORIZATION_RESPONSE_HANDLE_KEY).then(result => {
      var authResponse = JSON.parse(result!);

      request.setExtrasField('code_challenge', this.verifier.challenge);
      request.setExtrasField('code_challenge_method', this.verifier.method);

      this.tokenHandler.performTokenRequest(this.configuration, request)
          .then(tokenResponseJson => {
            this.storageBackend.removeItem(AUTHORIZATION_RESPONSE_HANDLE_KEY).then(() => {
              this.storageBackend.setItem(
                  AUTHORIZATION_RESPONSE_HANDLE_KEY, JSON.stringify(tokenResponseJson));
            });
          })
          .catch((err) => {
            console.log('error ' + err.message);
          });
    });
  }
}