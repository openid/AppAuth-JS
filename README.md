![AppAuth for JS](assets/logo.png)

AppAuth for JavaScript is a client SDK for [public clients](https://tools.ietf.org/html/rfc6749#section-2.1)
for communicating with [OAuth 2.0](https://tools.ietf.org/html/rfc6749)
and [OpenID Connect](http://openid.net/specs/openid-connect-core-1_0.html) providers
following the best practice
[RFC 8252 - OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252).
The library is designed for use in `Node.js` CLI applications,
`Chrome Apps` and applications that use `Electron` or similar frameworks.

It strives to directly map the requests and responses of those specifications,
while following the idiomatic style of the implementation language.

The library also supports the [PKCE](https://tools.ietf.org/html/rfc7636)
extension to OAuth which was created to secure authorization codes in public
clients when custom URI scheme redirects are used. The library is friendly to
other extensions (standard or otherwise) with the ability to handle additional
parameters in all protocol requests and responses.

### Examples


An example application using the library is included in the `src/node_app` folder and at https://github.com/googlesamples/appauth-js-electron-sample.


#### Auth Flow
AppAuth supports manual interaction with the Authorization Server where you need to perform
your own token exchanges. This example performs a manual exchange.

##### Fetch Service Configuration

```typescript
AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl)
  .then(response => {
    log('Fetched service configuration', response);
    this.configuration = response;
    this.showMessage('Completed fetching configuration');
  })
  .catch(error => {
    log('Something bad happened', error);
    this.showMessage(`Something bad happened ${error}`)
  });
```

##### Make Authorization Requests

```typescript
this.notifier = new AuthorizationNotifier();
// uses a redirect flow
this.authorizationHandler = new RedirectRequestHandler();
// set notifier to deliver responses
this.authorizationHandler.setAuthorizationNotifier(this.notifier);
// set a listener to listen for authorization responses
this.notifier.setAuthorizationListener((request, response, error) => {
  log('Authorization request complete ', request, response, error);
  if (response) {
    this.code = response.code;
    this.showMessage(`Authorization Code ${response.code}`);
  }
});

// create a request
let request = new AuthorizationRequest(
    clientId,
    redirectUri,
    scope,
    AuthorizationRequest.RESPONSE_TYPE_CODE,
    undefined, /* state */
    {'prompt': 'consent', 'access_type': 'offline'});

// make the authorization request
this.authorizationHandler.performAuthorizationRequest(this.configuration, request);
```

##### Making Token Requests

```typescript
this.tokenHandler = new BaseTokenRequestHandler();

let request: TokenRequest|null = null;

if (this.code) {
  // use the code to make the token request.
  request = new TokenRequest(
      clientId, redirectUri, GRANT_TYPE_AUTHORIZATION_CODE, this.code, undefined,
      {'client_secret': clientSecret});
} else if (this.tokenResponse) {
  // use the token response to make a request for an access token
  request = new TokenRequest(
      clientId, redirectUri, GRANT_TYPE_REFRESH_TOKEN, undefined,
      this.tokenResponse.refreshToken, {'client_secret': clientSecret});
}

this.tokenHandler.performTokenRequest(this.configuration, request)
  .then(response => {
    // ... do something with token response
  });
```

### Development

#### Preamble

This client has been written with [TypeScript](https://typescriptlang.org).

### Setup

* Install the latest version of [Node](https://nodejs.org/en/).
  [NVM](https://github.com/creationix/nvm)
  (Node Version Manager is highly recommended).

* Use `nvm install` to install the recommended Node.js version.

* Download the latest version of Visual Studio Code from
  [here](https://code.visualstudio.com/).

#### Provision Dependencies

This app uses `npm` to provision it dependencies.

* `git clone` the `AppAuthJS` library and go to the root folder of
   the project containing `package.json` file.
* `npm install` to install all the dev and project dependencies.

Thats it! You are now ready to start working on `AppAuthJS`.

#### Development Workflow

The project uses `npm` scripts to automate development workflows.
These scripts are made available via the `package.json` file.

The following scripts are included:

* `npm run-script compile` or `tsc` will compile all your TypeScript files.
   All compiled files go into the `built/` folder.

* `npm run-script watch` or `tsc --watch` will compile your TypeScript files
   in `watch` mode. Recommended if you want to get continuous feedback.

* `npm run-script build-app` generates the output `bundle.js` file in the `built/`
   directory. This includes the full `AppAuthJS` library including all
   its dependencies.

* `npm test` provisions the `Karma` test runner to run all unit tests.
   All tests are written using [Jasmine](http://jasmine.github.io/).
   To _DEBUG_ your tests, click on the `Debug` button in the Karma test runner
   to look at the actual source of the tests. You can attach break points here.

* `npm run-script app` builds the test app on a local web server.
   This is an end-to-end app which uses AppAuthJS and is a demonstration
   on how to use the library.

* `npm run-script node-app` builds a Node.js CLI sample app. This is an end-to-end app
   which uses AppAuthJS in a Node.js context.

