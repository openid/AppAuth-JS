"use strict";
/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectRequestHandler = void 0;
const authorization_request_ts_1 = require("./authorization_request.js");
const authorization_request_handler_ts_1 = require("./authorization_request_handler.js");
const authorization_response_ts_1 = require("./authorization_response.js");
const crypto_utils_ts_1 = require("./crypto_utils.js");
const logger_ts_1 = require("./logger.js");
const query_string_utils_ts_1 = require("./query_string_utils.js");
const storage_ts_1 = require("./storage.js");
/** key for authorization request. */
const authorizationRequestKey = (handle) => {
    return `${handle}_appauth_authorization_request`;
};
/** key for authorization service configuration */
const authorizationServiceConfigurationKey = (handle) => {
    return `${handle}_appauth_authorization_service_configuration`;
};
/** key in local storage which represents the current authorization request. */
const AUTHORIZATION_REQUEST_HANDLE_KEY = 'appauth_current_authorization_request';
/**
 * Represents an AuthorizationRequestHandler which uses a standard
 * redirect based code flow.
 */
class RedirectRequestHandler extends authorization_request_handler_ts_1.AuthorizationRequestHandler {
    constructor(
    // use the provided storage backend
    // or initialize local storage with the default storage backend which
    // uses window.localStorage
    storageBackend = new storage_ts_1.LocalStorageBackend(), utils = new query_string_utils_ts_1.BasicQueryStringUtils(), locationLike = window.location, crypto = new crypto_utils_ts_1.DefaultCrypto()) {
        super(utils, crypto);
        this.storageBackend = storageBackend;
        this.locationLike = locationLike;
    }
    performAuthorizationRequest(configuration, request) {
        const handle = this.crypto.generateRandom(10);
        // before you make request, persist all request related data in local storage.
        const persisted = Promise.all([
            this.storageBackend.setItem(AUTHORIZATION_REQUEST_HANDLE_KEY, handle),
            // Calling toJson() adds in the code & challenge when possible
            request.toJson().then(result => this.storageBackend.setItem(authorizationRequestKey(handle), JSON.stringify(result))),
            this.storageBackend.setItem(authorizationServiceConfigurationKey(handle), JSON.stringify(configuration.toJson())),
        ]);
        persisted.then(() => {
            // make the redirect request
            let url = this.buildRequestUrl(configuration, request);
            (0, logger_ts_1.log)('Making a request to ', request, url);
            this.locationLike.assign(url);
        });
    }
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * request.
     */
    completeAuthorizationRequest() {
        // TODO(rahulrav@): handle authorization errors.
        return this.storageBackend.getItem(AUTHORIZATION_REQUEST_HANDLE_KEY).then(handle => {
            if (handle) {
                // we have a pending request.
                // fetch authorization request, and check state
                return this.storageBackend
                    .getItem(authorizationRequestKey(handle))
                    // requires a corresponding instance of result
                    // TODO(rahulrav@): check for inconsitent state here
                    .then(result => JSON.parse(result))
                    .then(json => new authorization_request_ts_1.AuthorizationRequest(json))
                    .then(request => {
                    // check redirect_uri and state
                    let currentUri = `${this.locationLike.origin}${this.locationLike.pathname}`;
                    let queryParams = this.utils.parse(this.locationLike, true /* use hash */);
                    let state = queryParams['state'];
                    let code = queryParams['code'];
                    let error = queryParams['error'];
                    (0, logger_ts_1.log)('Potential authorization request ', currentUri, queryParams, state, code, error);
                    let shouldNotify = state === request.state;
                    let authorizationResponse = null;
                    let authorizationError = null;
                    if (shouldNotify) {
                        if (error) {
                            // get additional optional info.
                            let errorUri = queryParams['error_uri'];
                            let errorDescription = queryParams['error_description'];
                            authorizationError = new authorization_response_ts_1.AuthorizationError({
                                error: error,
                                error_description: errorDescription,
                                error_uri: errorUri,
                                state: state
                            });
                        }
                        else {
                            authorizationResponse = new authorization_response_ts_1.AuthorizationResponse({ code: code, state: state });
                        }
                        // cleanup state
                        return Promise
                            .all([
                            this.storageBackend.removeItem(AUTHORIZATION_REQUEST_HANDLE_KEY),
                            this.storageBackend.removeItem(authorizationRequestKey(handle)),
                            this.storageBackend.removeItem(authorizationServiceConfigurationKey(handle))
                        ])
                            .then(() => {
                            (0, logger_ts_1.log)('Delivering authorization response');
                            return {
                                request: request,
                                response: authorizationResponse,
                                error: authorizationError
                            };
                        });
                    }
                    else {
                        (0, logger_ts_1.log)('Mismatched request (state and request_uri) dont match.');
                        return Promise.resolve(null);
                    }
                });
            }
            else {
                return null;
            }
        });
    }
}
exports.RedirectRequestHandler = RedirectRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7OztBQUVILHlFQUFnRTtBQUNoRSx5RkFBNkc7QUFDN0csMkVBQXFGO0FBRXJGLHVEQUF3RDtBQUN4RCwyQ0FBZ0M7QUFDaEMsbUVBQThEO0FBQzlELDZDQUFpRTtBQUlqRSxxQ0FBcUM7QUFDckMsTUFBTSx1QkFBdUIsR0FDekIsQ0FBQyxNQUFjLEVBQUUsRUFBRTtJQUNqQixPQUFPLEdBQUcsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFFTCxrREFBa0Q7QUFDbEQsTUFBTSxvQ0FBb0MsR0FDdEMsQ0FBQyxNQUFjLEVBQUUsRUFBRTtJQUNqQixPQUFPLEdBQUcsTUFBTSw4Q0FBOEMsQ0FBQztBQUNqRSxDQUFDLENBQUE7QUFFTCwrRUFBK0U7QUFDL0UsTUFBTSxnQ0FBZ0MsR0FBRyx1Q0FBdUMsQ0FBQztBQUVqRjs7O0dBR0c7QUFDSCw0QkFBb0MsU0FBUSw4REFBMkI7SUFDckU7SUFDSSxtQ0FBbUM7SUFDbkMscUVBQXFFO0lBQ3JFLDJCQUEyQjtJQUNwQixjQUFjLEdBQW1CLElBQUksZ0NBQW1CLEVBQUUsRUFDakUsS0FBSyxHQUFHLElBQUksNkNBQXFCLEVBQUUsRUFDNUIsWUFBWSxHQUFpQixNQUFNLENBQUMsUUFBUSxFQUNuRCxNQUFNLEdBQVcsSUFBSSwrQkFBYSxFQUFFO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7OEJBSlosY0FBYzs0QkFFZCxZQUFZO0lBR3ZCLENBQUM7SUFFRCwyQkFBMkIsQ0FDdkIsYUFBZ0QsRUFDaEQsT0FBNkI7UUFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7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LENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0fSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciwgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZX0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlci50cyc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25FcnJvciwgQXV0aG9yaXphdGlvblJlc3BvbnNlfSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVzcG9uc2UudHMnXG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbi50cyc7XG5pbXBvcnQge0NyeXB0bywgRGVmYXVsdENyeXB0b30gZnJvbSAnLi9jcnlwdG9fdXRpbHMudHMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyLnRzJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscy50cyc7XG5pbXBvcnQge0xvY2FsU3RvcmFnZUJhY2tlbmQsIFN0b3JhZ2VCYWNrZW5kfSBmcm9tICcuL3N0b3JhZ2UudHMnO1xuaW1wb3J0IHtMb2NhdGlvbkxpa2V9IGZyb20gJy4vdHlwZXMudHMnO1xuXG5cbi8qKiBrZXkgZm9yIGF1dGhvcml6YXRpb24gcmVxdWVzdC4gKi9cbmNvbnN0IGF1dGhvcml6YXRpb25SZXF1ZXN0S2V5ID1cbiAgICAoaGFuZGxlOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfYXV0aG9yaXphdGlvbl9yZXF1ZXN0YDtcbiAgICB9XG5cbi8qKiBrZXkgZm9yIGF1dGhvcml6YXRpb24gc2VydmljZSBjb25maWd1cmF0aW9uICovXG5jb25zdCBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkgPVxuICAgIChoYW5kbGU6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGAke2hhbmRsZX1fYXBwYXV0aF9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbmA7XG4gICAgfVxuXG4vKioga2V5IGluIGxvY2FsIHN0b3JhZ2Ugd2hpY2ggcmVwcmVzZW50cyB0aGUgY3VycmVudCBhdXRob3JpemF0aW9uIHJlcXVlc3QuICovXG5jb25zdCBBVVRIT1JJWkFUSU9OX1JFUVVFU1RfSEFORExFX0tFWSA9ICdhcHBhdXRoX2N1cnJlbnRfYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB3aGljaCB1c2VzIGEgc3RhbmRhcmRcbiAqIHJlZGlyZWN0IGJhc2VkIGNvZGUgZmxvdy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZGlyZWN0UmVxdWVzdEhhbmRsZXIgZXh0ZW5kcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8vIHVzZSB0aGUgcHJvdmlkZWQgc3RvcmFnZSBiYWNrZW5kXG4gICAgICAvLyBvciBpbml0aWFsaXplIGxvY2FsIHN0b3JhZ2Ugd2l0aCB0aGUgZGVmYXVsdCBzdG9yYWdlIGJhY2tlbmQgd2hpY2hcbiAgICAgIC8vIHVzZXMgd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAgcHVibGljIHN0b3JhZ2VCYWNrZW5kOiBTdG9yYWdlQmFja2VuZCA9IG5ldyBMb2NhbFN0b3JhZ2VCYWNrZW5kKCksXG4gICAgICB1dGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSxcbiAgICAgIHB1YmxpYyBsb2NhdGlvbkxpa2U6IExvY2F0aW9uTGlrZSA9IHdpbmRvdy5sb2NhdGlvbixcbiAgICAgIGNyeXB0bzogQ3J5cHRvID0gbmV3IERlZmF1bHRDcnlwdG8oKSkge1xuICAgIHN1cGVyKHV0aWxzLCBjcnlwdG8pO1xuICB9XG5cbiAgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcbiAgICBjb25zdCBoYW5kbGUgPSB0aGlzLmNyeXB0by5nZW5lcmF0ZVJhbmRvbSgxMCk7XG5cbiAgICAvLyBiZWZvcmUgeW91IG1ha2UgcmVxdWVzdCwgcGVyc2lzdCBhbGwgcmVxdWVzdCByZWxhdGVkIGRhdGEgaW4gbG9jYWwgc3RvcmFnZS5cbiAgICBjb25zdCBwZXJzaXN0ZWQgPSBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oQVVUSE9SSVpBVElPTl9SRVFVRVNUX0hBTkRMRV9LRVksIGhhbmRsZSksXG4gICAgICAvLyBDYWxsaW5nIHRvSnNvbigpIGFkZHMgaW4gdGhlIGNvZGUgJiBjaGFsbGVuZ2Ugd2hlbiBwb3NzaWJsZVxuICAgICAgcmVxdWVzdC50b0pzb24oKS50aGVuKFxuICAgICAgICAgIHJlc3VsdCA9PlxuICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSkpLFxuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKFxuICAgICAgICAgIGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleShoYW5kbGUpLCBKU09OLnN0cmluZ2lmeShjb25maWd1cmF0aW9uLnRvSnNvbigpKSksXG4gICAgXSk7XG5cbiAgICBwZXJzaXN0ZWQudGhlbigoKSA9PiB7XG4gICAgICAvLyBtYWtlIHRoZSByZWRpcmVjdCByZXF1ZXN0XG4gICAgICBsZXQgdXJsID0gdGhpcy5idWlsZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgcmVxdWVzdCk7XG4gICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgIHRoaXMubG9jYXRpb25MaWtlLmFzc2lnbih1cmwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIGludHJvc3BlY3QgdGhlIGNvbnRlbnRzIG9mIHN0b3JhZ2UgYmFja2VuZCBhbmQgY29tcGxldGVzIHRoZVxuICAgKiByZXF1ZXN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+IHtcbiAgICAvLyBUT0RPKHJhaHVscmF2QCk6IGhhbmRsZSBhdXRob3JpemF0aW9uIGVycm9ycy5cbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZC5nZXRJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZKS50aGVuKGhhbmRsZSA9PiB7XG4gICAgICBpZiAoaGFuZGxlKSB7XG4gICAgICAgIC8vIHdlIGhhdmUgYSBwZW5kaW5nIHJlcXVlc3QuXG4gICAgICAgIC8vIGZldGNoIGF1dGhvcml6YXRpb24gcmVxdWVzdCwgYW5kIGNoZWNrIHN0YXRlXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kXG4gICAgICAgICAgICAuZ2V0SXRlbShhdXRob3JpemF0aW9uUmVxdWVzdEtleShoYW5kbGUpKVxuICAgICAgICAgICAgLy8gcmVxdWlyZXMgYSBjb3JyZXNwb25kaW5nIGluc3RhbmNlIG9mIHJlc3VsdFxuICAgICAgICAgICAgLy8gVE9ETyhyYWh1bHJhdkApOiBjaGVjayBmb3IgaW5jb25zaXRlbnQgc3RhdGUgaGVyZVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IEpTT04ucGFyc2UocmVzdWx0ISkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IG5ldyBBdXRob3JpemF0aW9uUmVxdWVzdChqc29uKSlcbiAgICAgICAgICAgIC50aGVuKHJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgICAvLyBjaGVjayByZWRpcmVjdF91cmkgYW5kIHN0YXRlXG4gICAgICAgICAgICAgIGxldCBjdXJyZW50VXJpID0gYCR7dGhpcy5sb2NhdGlvbkxpa2Uub3JpZ2lufSR7dGhpcy5sb2NhdGlvbkxpa2UucGF0aG5hbWV9YDtcbiAgICAgICAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0gdGhpcy51dGlscy5wYXJzZSh0aGlzLmxvY2F0aW9uTGlrZSwgdHJ1ZSAvKiB1c2UgaGFzaCAqLyk7XG4gICAgICAgICAgICAgIGxldCBzdGF0ZTogc3RyaW5nfHVuZGVmaW5lZCA9IHF1ZXJ5UGFyYW1zWydzdGF0ZSddO1xuICAgICAgICAgICAgICBsZXQgY29kZTogc3RyaW5nfHVuZGVmaW5lZCA9IHF1ZXJ5UGFyYW1zWydjb2RlJ107XG4gICAgICAgICAgICAgIGxldCBlcnJvcjogc3RyaW5nfHVuZGVmaW5lZCA9IHF1ZXJ5UGFyYW1zWydlcnJvciddO1xuICAgICAgICAgICAgICBsb2coJ1BvdGVudGlhbCBhdXRob3JpemF0aW9uIHJlcXVlc3QgJywgY3VycmVudFVyaSwgcXVlcnlQYXJhbXMsIHN0YXRlLCBjb2RlLCBlcnJvcik7XG4gICAgICAgICAgICAgIGxldCBzaG91bGROb3RpZnkgPSBzdGF0ZSA9PT0gcmVxdWVzdC5zdGF0ZTtcbiAgICAgICAgICAgICAgbGV0IGF1dGhvcml6YXRpb25SZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwgPSBudWxsO1xuICAgICAgICAgICAgICBsZXQgYXV0aG9yaXphdGlvbkVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCA9IG51bGw7XG4gICAgICAgICAgICAgIGlmIChzaG91bGROb3RpZnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGdldCBhZGRpdGlvbmFsIG9wdGlvbmFsIGluZm8uXG4gICAgICAgICAgICAgICAgICBsZXQgZXJyb3JVcmkgPSBxdWVyeVBhcmFtc1snZXJyb3JfdXJpJ107XG4gICAgICAgICAgICAgICAgICBsZXQgZXJyb3JEZXNjcmlwdGlvbiA9IHF1ZXJ5UGFyYW1zWydlcnJvcl9kZXNjcmlwdGlvbiddO1xuICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVycm9yID0gbmV3IEF1dGhvcml6YXRpb25FcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfZGVzY3JpcHRpb246IGVycm9yRGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yX3VyaTogZXJyb3JVcmksXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25SZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2Uoe2NvZGU6IGNvZGUsIHN0YXRlOiBzdGF0ZX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHN0YXRlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZKSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSksXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleShoYW5kbGUpKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgbG9nKCdEZWxpdmVyaW5nIGF1dGhvcml6YXRpb24gcmVzcG9uc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBhdXRob3JpemF0aW9uUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgfSBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2coJ01pc21hdGNoZWQgcmVxdWVzdCAoc3RhdGUgYW5kIHJlcXVlc3RfdXJpKSBkb250IG1hdGNoLicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==