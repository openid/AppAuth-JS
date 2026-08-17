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
import { log } from './logger';
import { requireValidUrl } from './url_validator';
/**
 * Authorization Service notifier.
 * This manages the communication of the AuthorizationResponse to the 3p client.
 */
export class AuthorizationNotifier {
    constructor() {
        this.listener = null;
    }
    setAuthorizationListener(listener) {
        this.listener = listener;
    }
    /**
     * The authorization complete callback.
     */
    onAuthorizationComplete(request, response, error) {
        if (this.listener) {
            // complete authorization request
            this.listener(request, response, error);
        }
    }
}
// TODO(rahulrav@): add more built in parameters.
/* built in parameters. */
export const BUILT_IN_PARAMETERS = ['redirect_uri', 'client_id', 'response_type', 'state', 'scope'];
/**
 * Defines the interface which is capable of handling an authorization request
 * using various methods (iframe / popup / different process etc.).
 */
export class AuthorizationRequestHandler {
    constructor(utils, crypto) {
        this.utils = utils;
        this.crypto = crypto;
        // notifier send the response back to the client.
        this.notifier = null;
    }
    /**
     * A utility method to be able to build the authorization request URL.
     */
    buildRequestUrl(configuration, request) {
        // build the query string
        // coerce to any type for convenience
        let requestMap = {
            'redirect_uri': request.redirectUri,
            'client_id': request.clientId,
            'response_type': request.responseType,
            'state': request.state,
            'scope': request.scope
        };
        // copy over extras
        if (request.extras) {
            for (let extra in request.extras) {
                if (request.extras.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    if (BUILT_IN_PARAMETERS.indexOf(extra) < 0) {
                        requestMap[extra] = request.extras[extra];
                    }
                }
            }
        }
        let query = this.utils.stringify(requestMap);
        let baseUrl = requireValidUrl(configuration.authorizationEndpoint);
        let url = `${baseUrl}?${query}`;
        return url;
    }
    /**
     * Completes the authorization request if necessary & when possible.
     */
    completeAuthorizationRequestIfPossible() {
        // call complete authorization if possible to see there might
        // be a response that needs to be delivered.
        log(`Checking to see if there is an authorization response to be delivered.`);
        if (!this.notifier) {
            log(`Notifier is not present on AuthorizationRequest handler.
          No delivery of result will be possible`);
        }
        return this.completeAuthorizationRequest().then(result => {
            if (!result) {
                log(`No result is available yet.`);
            }
            if (result && this.notifier) {
                this.notifier.onAuthorizationComplete(result.request, result.response, result.error);
            }
        });
    }
    /**
     * Sets the default Authorization Service notifier.
     */
    setAuthorizationNotifier(notifier) {
        this.notifier = notifier;
        return this;
    }
    ;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztHQVlHO0FBTUgsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUc3QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFxQmhEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxxQkFBcUI7SUFBbEM7UUFDVSxhQUFRLEdBQStCLElBQUksQ0FBQztJQWtCdEQsQ0FBQztJQWhCQyx3QkFBd0IsQ0FBQyxRQUErQjtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCx1QkFBdUIsQ0FDbkIsT0FBNkIsRUFDN0IsUUFBb0MsRUFDcEMsS0FBOEI7UUFDaEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBRUQsaURBQWlEO0FBQ2pELDBCQUEwQjtBQUMxQixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUVwRzs7O0dBR0c7QUFDSCxNQUFNLE9BQWdCLDJCQUEyQjtJQUMvQyxZQUFtQixLQUF1QixFQUFZLE1BQWM7UUFBakQsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXBFLGlEQUFpRDtRQUN2QyxhQUFRLEdBQStCLElBQUksQ0FBQztJQUhpQixDQUFDO0lBS3hFOztPQUVHO0lBQ08sZUFBZSxDQUNyQixhQUFnRCxFQUNoRCxPQUE2QjtRQUMvQix5QkFBeUI7UUFDekIscUNBQXFDO1FBQ3JDLElBQUksVUFBVSxHQUFjO1lBQzFCLGNBQWMsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNuQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDN0IsZUFBZSxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQ3JDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSztZQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDdkIsQ0FBQztRQUVGLG1CQUFtQjtRQUNuQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixLQUFLLElBQUksS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUN6Qyx1Q0FBdUM7b0JBQ3ZDLElBQUksbUJBQW1CLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUMzQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUMsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxJQUFJLE9BQU8sR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkUsSUFBSSxHQUFHLEdBQUcsR0FBRyxPQUFPLElBQUksS0FBSyxFQUFFLENBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQ0FBc0M7UUFDcEMsNkRBQTZEO1FBQzdELDRDQUE0QztRQUM1QyxHQUFHLENBQUMsd0VBQXdFLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25CLEdBQUcsQ0FBQztpREFDdUMsQ0FBQyxDQUFBO1FBQzlDLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ1osR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDckMsQ0FBQztZQUNELElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZGLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILHdCQUF3QixDQUFDLFFBQStCO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUFBLENBQUM7Q0FlSCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0fSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25FcnJvciwgQXV0aG9yaXphdGlvblJlc3BvbnNlfSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge1F1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7cmVxdWlyZVZhbGlkVXJsfSBmcm9tICcuL3VybF92YWxpZGF0b3InO1xuXG5cbi8qKlxuICogVGhpcyB0eXBlIHJlcHJlc2VudHMgYSBsYW1iZGEgdGhhdCBjYW4gdGFrZSBhbiBBdXRob3JpemF0aW9uUmVxdWVzdCxcbiAqIGFuZCBhbiBBdXRob3JpemF0aW9uUmVzcG9uc2UgYXMgYXJndW1lbnRzLlxuICovXG5leHBvcnQgdHlwZSBBdXRob3JpemF0aW9uTGlzdGVuZXIgPVxuICAgIChyZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCxcbiAgICAgcmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsLFxuICAgICBlcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwpID0+IHZvaWQ7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0cnVjdHVyYWwgdHlwZSBob2xkaW5nIGJvdGggYXV0aG9yaXphdGlvbiByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlIHtcbiAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3Q7XG4gIHJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbDtcbiAgZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsO1xufVxuXG4vKipcbiAqIEF1dGhvcml6YXRpb24gU2VydmljZSBub3RpZmllci5cbiAqIFRoaXMgbWFuYWdlcyB0aGUgY29tbXVuaWNhdGlvbiBvZiB0aGUgQXV0aG9yaXphdGlvblJlc3BvbnNlIHRvIHRoZSAzcCBjbGllbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uTm90aWZpZXIge1xuICBwcml2YXRlIGxpc3RlbmVyOiBBdXRob3JpemF0aW9uTGlzdGVuZXJ8bnVsbCA9IG51bGw7XG5cbiAgc2V0QXV0aG9yaXphdGlvbkxpc3RlbmVyKGxpc3RlbmVyOiBBdXRob3JpemF0aW9uTGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGF1dGhvcml6YXRpb24gY29tcGxldGUgY2FsbGJhY2suXG4gICAqL1xuICBvbkF1dGhvcml6YXRpb25Db21wbGV0ZShcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0LFxuICAgICAgcmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsLFxuICAgICAgZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdGVuZXIpIHtcbiAgICAgIC8vIGNvbXBsZXRlIGF1dGhvcml6YXRpb24gcmVxdWVzdFxuICAgICAgdGhpcy5saXN0ZW5lcihyZXF1ZXN0LCByZXNwb25zZSwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBUT0RPKHJhaHVscmF2QCk6IGFkZCBtb3JlIGJ1aWx0IGluIHBhcmFtZXRlcnMuXG4vKiBidWlsdCBpbiBwYXJhbWV0ZXJzLiAqL1xuZXhwb3J0IGNvbnN0IEJVSUxUX0lOX1BBUkFNRVRFUlMgPSBbJ3JlZGlyZWN0X3VyaScsICdjbGllbnRfaWQnLCAncmVzcG9uc2VfdHlwZScsICdzdGF0ZScsICdzY29wZSddO1xuXG4vKipcbiAqIERlZmluZXMgdGhlIGludGVyZmFjZSB3aGljaCBpcyBjYXBhYmxlIG9mIGhhbmRsaW5nIGFuIGF1dGhvcml6YXRpb24gcmVxdWVzdFxuICogdXNpbmcgdmFyaW91cyBtZXRob2RzIChpZnJhbWUgLyBwb3B1cCAvIGRpZmZlcmVudCBwcm9jZXNzIGV0Yy4pLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzLCBwcm90ZWN0ZWQgY3J5cHRvOiBDcnlwdG8pIHt9XG5cbiAgLy8gbm90aWZpZXIgc2VuZCB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGUgY2xpZW50LlxuICBwcm90ZWN0ZWQgbm90aWZpZXI6IEF1dGhvcml6YXRpb25Ob3RpZmllcnxudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQSB1dGlsaXR5IG1ldGhvZCB0byBiZSBhYmxlIHRvIGJ1aWxkIHRoZSBhdXRob3JpemF0aW9uIHJlcXVlc3QgVVJMLlxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkUmVxdWVzdFVybChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0KSB7XG4gICAgLy8gYnVpbGQgdGhlIHF1ZXJ5IHN0cmluZ1xuICAgIC8vIGNvZXJjZSB0byBhbnkgdHlwZSBmb3IgY29udmVuaWVuY2VcbiAgICBsZXQgcmVxdWVzdE1hcDogU3RyaW5nTWFwID0ge1xuICAgICAgJ3JlZGlyZWN0X3VyaSc6IHJlcXVlc3QucmVkaXJlY3RVcmksXG4gICAgICAnY2xpZW50X2lkJzogcmVxdWVzdC5jbGllbnRJZCxcbiAgICAgICdyZXNwb25zZV90eXBlJzogcmVxdWVzdC5yZXNwb25zZVR5cGUsXG4gICAgICAnc3RhdGUnOiByZXF1ZXN0LnN0YXRlLFxuICAgICAgJ3Njb3BlJzogcmVxdWVzdC5zY29wZVxuICAgIH07XG5cbiAgICAvLyBjb3B5IG92ZXIgZXh0cmFzXG4gICAgaWYgKHJlcXVlc3QuZXh0cmFzKSB7XG4gICAgICBmb3IgKGxldCBleHRyYSBpbiByZXF1ZXN0LmV4dHJhcykge1xuICAgICAgICBpZiAocmVxdWVzdC5leHRyYXMuaGFzT3duUHJvcGVydHkoZXh0cmEpKSB7XG4gICAgICAgICAgLy8gY2hlY2sgYmVmb3JlIGluc2VydGluZyB0byByZXF1ZXN0TWFwXG4gICAgICAgICAgaWYgKEJVSUxUX0lOX1BBUkFNRVRFUlMuaW5kZXhPZihleHRyYSkgPCAwKSB7XG4gICAgICAgICAgICByZXF1ZXN0TWFwW2V4dHJhXSA9IHJlcXVlc3QuZXh0cmFzW2V4dHJhXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcXVlcnkgPSB0aGlzLnV0aWxzLnN0cmluZ2lmeShyZXF1ZXN0TWFwKTtcbiAgICBsZXQgYmFzZVVybCA9IHJlcXVpcmVWYWxpZFVybChjb25maWd1cmF0aW9uLmF1dGhvcml6YXRpb25FbmRwb2ludCk7XG4gICAgbGV0IHVybCA9IGAke2Jhc2VVcmx9PyR7cXVlcnl9YDtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlcyB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0IGlmIG5lY2Vzc2FyeSAmIHdoZW4gcG9zc2libGUuXG4gICAqL1xuICBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0SWZQb3NzaWJsZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBjYWxsIGNvbXBsZXRlIGF1dGhvcml6YXRpb24gaWYgcG9zc2libGUgdG8gc2VlIHRoZXJlIG1pZ2h0XG4gICAgLy8gYmUgYSByZXNwb25zZSB0aGF0IG5lZWRzIHRvIGJlIGRlbGl2ZXJlZC5cbiAgICBsb2coYENoZWNraW5nIHRvIHNlZSBpZiB0aGVyZSBpcyBhbiBhdXRob3JpemF0aW9uIHJlc3BvbnNlIHRvIGJlIGRlbGl2ZXJlZC5gKTtcbiAgICBpZiAoIXRoaXMubm90aWZpZXIpIHtcbiAgICAgIGxvZyhgTm90aWZpZXIgaXMgbm90IHByZXNlbnQgb24gQXV0aG9yaXphdGlvblJlcXVlc3QgaGFuZGxlci5cbiAgICAgICAgICBObyBkZWxpdmVyeSBvZiByZXN1bHQgd2lsbCBiZSBwb3NzaWJsZWApXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICBsb2coYE5vIHJlc3VsdCBpcyBhdmFpbGFibGUgeWV0LmApO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCAmJiB0aGlzLm5vdGlmaWVyKSB7XG4gICAgICAgIHRoaXMubm90aWZpZXIub25BdXRob3JpemF0aW9uQ29tcGxldGUocmVzdWx0LnJlcXVlc3QsIHJlc3VsdC5yZXNwb25zZSwgcmVzdWx0LmVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkZWZhdWx0IEF1dGhvcml6YXRpb24gU2VydmljZSBub3RpZmllci5cbiAgICovXG4gIHNldEF1dGhvcml6YXRpb25Ob3RpZmllcihub3RpZmllcjogQXV0aG9yaXphdGlvbk5vdGlmaWVyKTogQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcbiAgICB0aGlzLm5vdGlmaWVyID0gbm90aWZpZXI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ha2VzIGFuIGF1dGhvcml6YXRpb24gcmVxdWVzdC5cbiAgICovXG4gIGFic3RyYWN0IHBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0KTogdm9pZDtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFuIGF1dGhvcml6YXRpb24gZmxvdyBjYW4gYmUgY29tcGxldGVkLCBhbmQgY29tcGxldGVzIGl0LlxuICAgKiBUaGUgaGFuZGxlciByZXR1cm5zIGEgYFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZT5gIGlmIHJlYWR5LCBvciBhIGBQcm9taXNlPG51bGw+YFxuICAgKiBpZiBub3QgcmVhZHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD47XG59XG4iXX0=