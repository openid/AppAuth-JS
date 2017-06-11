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
/**
 * Represents the AuthorizationService which can be used to make
 * authorization requests and token requests.
 */
var AuthorizationService = (function () {
    function AuthorizationService() {
        // notifier send the response back to the client.
        this.notifier = null;
        // handler handles the actual authorization request.
        this.handler = null;
    }
    /**
     * Sets the default Authorization Service notifier.
     */
    AuthorizationService.prototype.setAuthorizationNotifier = function (notifier) {
        this.notifier = notifier;
        this.registerListener();
        return this;
    };
    ;
    /**
     * Registers an authorization listener.
     */
    AuthorizationService.prototype.registerListener = function () {
        if (this.notifier) {
            this.notifier.setAuthorizationListener(function (request, response) {
                // handle response
            });
        }
    };
    /**
     * Sets the default Authorization Request handler.
     * Typically this will be configured based on the platform.
     */
    AuthorizationService.prototype.setAuthorizationRequestHandler = function (handler) {
        this.handler = handler;
        return this;
    };
    /**
     * Performs the authorization request using the AuthorizationRequestHandler.
     */
    AuthorizationService.prototype.performAuthorizationRequest = function (request) {
        // use the handler to make the authorization request, and to complete it.
    };
    return AuthorizationService;
}());
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQU9IOzs7R0FHRztBQUNIO0lBQUE7UUFDRSxpREFBaUQ7UUFDekMsYUFBUSxHQUErQixJQUFJLENBQUM7UUFFcEQsb0RBQW9EO1FBQzVDLFlBQU8sR0FBcUMsSUFBSSxDQUFDO0lBdUMzRCxDQUFDO0lBckNDOztPQUVHO0lBQ0gsdURBQXdCLEdBQXhCLFVBQXlCLFFBQStCO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQUEsQ0FBQztJQUVGOztPQUVHO0lBQ0ssK0NBQWdCLEdBQXhCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FDbEMsVUFBQyxPQUFPLEVBQUUsUUFBUTtnQkFDZCxrQkFBa0I7WUFFdEIsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILDZEQUE4QixHQUE5QixVQUErQixPQUFvQztRQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMERBQTJCLEdBQTNCLFVBQTRCLE9BQTZCO1FBQ3ZELHlFQUF5RTtJQUMzRSxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0fSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25MaXN0ZW5lciwgQXV0aG9yaXphdGlvbk5vdGlmaWVyLCBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVzcG9uc2UsIEF1dGhvcml6YXRpb25SZXNwb25zZUpzb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uU2VydmljZSB3aGljaCBjYW4gYmUgdXNlZCB0byBtYWtlXG4gKiBhdXRob3JpemF0aW9uIHJlcXVlc3RzIGFuZCB0b2tlbiByZXF1ZXN0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25TZXJ2aWNlIHtcbiAgLy8gbm90aWZpZXIgc2VuZCB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGUgY2xpZW50LlxuICBwcml2YXRlIG5vdGlmaWVyOiBBdXRob3JpemF0aW9uTm90aWZpZXJ8bnVsbCA9IG51bGw7XG5cbiAgLy8gaGFuZGxlciBoYW5kbGVzIHRoZSBhY3R1YWwgYXV0aG9yaXphdGlvbiByZXF1ZXN0LlxuICBwcml2YXRlIGhhbmRsZXI6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcnxudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVmYXVsdCBBdXRob3JpemF0aW9uIFNlcnZpY2Ugbm90aWZpZXIuXG4gICAqL1xuICBzZXRBdXRob3JpemF0aW9uTm90aWZpZXIobm90aWZpZXI6IEF1dGhvcml6YXRpb25Ob3RpZmllcik6IEF1dGhvcml6YXRpb25TZXJ2aWNlIHtcbiAgICB0aGlzLm5vdGlmaWVyID0gbm90aWZpZXI7XG4gICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVyKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBhdXRob3JpemF0aW9uIGxpc3RlbmVyLlxuICAgKi9cbiAgcHJpdmF0ZSByZWdpc3Rlckxpc3RlbmVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vdGlmaWVyKSB7XG4gICAgICB0aGlzLm5vdGlmaWVyLnNldEF1dGhvcml6YXRpb25MaXN0ZW5lcihcbiAgICAgICAgICAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgLy8gaGFuZGxlIHJlc3BvbnNlXG5cbiAgICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVmYXVsdCBBdXRob3JpemF0aW9uIFJlcXVlc3QgaGFuZGxlci5cbiAgICogVHlwaWNhbGx5IHRoaXMgd2lsbCBiZSBjb25maWd1cmVkIGJhc2VkIG9uIHRoZSBwbGF0Zm9ybS5cbiAgICovXG4gIHNldEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcihoYW5kbGVyOiBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIpOiBBdXRob3JpemF0aW9uU2VydmljZSB7XG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0IHVzaW5nIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIuXG4gICAqL1xuICBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QocmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpOiB2b2lkIHtcbiAgICAvLyB1c2UgdGhlIGhhbmRsZXIgdG8gbWFrZSB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0LCBhbmQgdG8gY29tcGxldGUgaXQuXG4gIH1cbn1cbiJdfQ==