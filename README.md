![AppAuth for JS](assets/logo.png)

AppAuth for JavaScript is a client SDK for [public clients](https://tools.ietf.org/html/rfc6749#section-2.1)
for communicating with [OAuth 2.0](https://tools.ietf.org/html/rfc6749) and [OpenID Connect](http://openid.net/specs/openid-connect-core-1_0.html) providers
following the recommendation in [RFC 8252 - OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252)
to use the platform's native user agent (browser) and the [Proof Key for Code Exchange PKCE](https://tools.ietf.org/html/rfc7636) extension.

[PKCE](https://tools.ietf.org/html/rfc7636) is an extension to OAuth which was created to secure authorization codes in public
clients when [app-owned](https://tools.ietf.org/html/rfc8252#section-8.4) URI scheme redirects are used.

The library is designed for use in `Web Apps`, `Node.js` CLI applications,
`Chrome Apps` and applications that use `Electron` or similar frameworks.

The library is friendly to
other extensions (standard or otherwise) with the ability to handle additional
parameters in all protocol requests and responses.

### Examples

An example application using the library is included in the `src/node_app` folder and at https://github.com/googlesamples/appauth-js-electron-sample.

#### Auth Flow

AppAuth supports manual interaction with the Authorization Server (AS) (also called a Security Token Service) to do [a token exchange](https://tools.ietf.org/html/rfc8252#section-4.1). Remember, in the OAuth2 Authorization Code flow, the client (your app) first fetches an *authorization code*, which is then exchanged for a *token* (and optionally a *refresh token*), which in turn can be used to make requests to an API (a Relying Party, because it relies on the AS/STS).

But, before all of that, the client needs to know the URI:s of the AS, as so it needs to:

##### Fetch the Service Configuration

This code will request `/.well-known/openid-configuration`from your OpenID Connect server (AS).

```typescript
// out:
let config: AuthorizationServiceConfiguration | null = null

AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl)
  .then(response => {
    console.log('Fetched OIDC configuration from /.well-known/openid-configuration', response)
		config = response
  })
  .catch(error => {
    console.log('Error fetching well-known OIDC endpoint', error)
  });
```

##### Fetch the Authorization Code from the Authorization Endpoint

```typescript
// input: `config` from the previous snippet
// out:
let code: string | null = null // output: the authorization code will be saved here

const notifier = new AuthorizationNotifier()
// Set a listener to listen for authorization responses
notifier.setAuthorizationListener((request, response, error) => {
  console.log('Authorization request complete ', request, response, error)
  if (response) {
    code = response.code // save the authorization code
		console.log('Authorization Code', code)
  }
})

// Uses a redirect flow with the above notifier
const authorizationHandler = new RedirectRequestHandler()
authorizationHandler.setAuthorizationNotifier(notifier)

// Invoke the handler's authorization flow, which causes the authentication/consent flow to get triggered
const request = new AuthorizationRequest({
  client_id: "my-sample-app-client",
  redirect_uri: `${window.location.origin}/oauth2/c/my-own-idp-callback`,
  scope: 'openid',
  response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
  state: null,
  extras: {'prompt': 'consent', 'access_type': 'offline'}
})

// Side-effecting call to start the authentication and consent/authorisation flow;
// uses the `config` from the prev. code snippet
authorizationHandler.performAuthorizationRequest(config, request)
```

If all is successful (user authenticates successfully and consent is given to your app), your `AuthorizationNotifer` should be capturing the token and log it to the console.

The `authorization code` can be used once to transform it into a `token`:

##### Making Token Requests

```typescript
// in: code
// out: token or refresh-token request
let request: TokenRequest | null = null
// out: token response; you should save this and keep it up to date with token response data
let tokenResponse: TokenResponse | null = null

// Depending on where you app is in its lifecycle, you may not have a code available;
// you only need it to get the token + refresh token. In this case, we pretend `code`
// is null
if (code) {
  // support PKCE:
  let extras: StringMap | null = null
  if (this.request && this.request.internal) {
    extras = {};
    extras['code_verifier'] = this.request.internal['code_verifier']
  }
  
  // use the code to make the token request.
  request = new TokenRequest({
    client_id: "my-sample-app-client",
    redirect_uri: `${window.location.origin}/oauth2/c/my-own-idp-callback`,
    grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
    code: code,
    refresh_token: null,
    extras: extras
  });
} else if (tokenResponse) {
  // use the token response to make a request for an access token
  request = new TokenRequest({
    client_id: "my-sample-app-client",
    redirect_uri: `${window.location.origin}/oauth2/c/my-own-idp-callback`,
    grant_type: GRANT_TYPE_REFRESH_TOKEN,
    refresh_token: this.tokenResponse.refreshToken
  });
}

const tokenHandler = new BaseTokenRequestHandler()
tokenHandler.performTokenRequest(this.configuration, request)
  .then(response => {
		tokenResponse = response
  	console.log("Got token resource", response)
  });
```

### Development

#### Preamble

This client has been written with [TypeScript](https://typescriptlang.org).

### Setup

- Install the latest version of [Node](https://nodejs.org/en/).
  [NVM](https://github.com/creationix/nvm)
  (Node Version Manager is highly recommended).
- Use `nvm install` to install the recommended Node.js version.
- Download the latest version of Visual Studio Code from
  [here](https://code.visualstudio.com/).

#### Provision Dependencies

This app uses `npm` to provision it dependencies.

- `git clone` the `AppAuthJS` library and go to the root folder of
  the project containing `package.json` file.
- `npm install` to install all the dev and project dependencies.

Thats it! You are now ready to start working on `AppAuthJS`.

#### Development Workflow

The project uses `npm` scripts to automate development workflows.
These scripts are made available via the `package.json` file.

The following scripts are included:

- `npm run-script compile` or `tsc` will compile all your TypeScript files.
  All compiled files go into the `built/` folder.
- `npm run-script watch` or `tsc --watch` will compile your TypeScript files
  in `watch` mode. Recommended if you want to get continuous feedback.
- `npm run-script build-app` generates the output `bundle.js` file in the `built/`
  directory. This includes the full `AppAuthJS` library including all
  its dependencies.
- `npm test` provisions the `Karma` test runner to run all unit tests.
  All tests are written using [Jasmine](http://jasmine.github.io/).
  To _DEBUG_ your tests, click on the `Debug` button in the Karma test runner
  to look at the actual source of the tests. You can attach break points here.
- `npm run-script app` builds the test app on a local web server.
  This is an end-to-end app which uses AppAuthJS and is a demonstration
  on how to use the library.
- `npm run-script node-app` builds a Node.js CLI sample app. This is an end-to-end app
  which uses AppAuthJS in a Node.js context.
