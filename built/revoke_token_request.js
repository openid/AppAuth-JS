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
 * Represents a revoke token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc7009#section-2.1
 */
var RevokeTokenRequest = (function () {
    function RevokeTokenRequest(token, tokenTypeHint, clientId, clientSecret) {
        this.token = token;
        this.tokenTypeHint = tokenTypeHint;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    /**
     * Serializes a TokenRequest to a JavaScript object.
     */
    RevokeTokenRequest.prototype.toJson = function () {
        return {
            token: this.token,
            token_type_hint: this.tokenTypeHint,
        };
    };
    // TODO: http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication
    // support client_secret_basic and client_secret_post, this also applies to the token endpoint
    /*needsAuthentication(): boolean {
      return this.clientId !== undefined && this.clientSecret !== undefined;
    }
  
    getBasicAuthorizationHeader(): string {
      if (!this.needsAuthentication()) {
        return '';
      }
  
      var credentials = this.clientId + ':' + this.clientSecret;
      var basicScheme = btoa(credentials);
      return 'Basic ' + basicScheme;
    }*/
    RevokeTokenRequest.prototype.toStringMap = function () {
        var map = { token: this.token };
        if (this.tokenTypeHint) {
            map['token_type_hint'] = this.tokenTypeHint;
        }
        if (this.clientId) {
            map['client_id'] = this.clientId;
        }
        if (this.clientSecret) {
            map['client_secret'] = this.clientSecret;
        }
        return map;
    };
    RevokeTokenRequest.fromJson = function (input) {
        return new RevokeTokenRequest(input.token);
    };
    return RevokeTokenRequest;
}());
exports.RevokeTokenRequest = RevokeTokenRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2b2tlX3Rva2VuX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmV2b2tlX3Rva2VuX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFhSDs7OztHQUlHO0FBQ0g7SUFDRSw0QkFDVyxLQUFhLEVBQ2IsYUFBc0IsRUFDdEIsUUFBaUIsRUFDakIsWUFBcUI7UUFIckIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGtCQUFhLEdBQWIsYUFBYSxDQUFTO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsaUJBQVksR0FBWixZQUFZLENBQVM7SUFBRyxDQUFDO0lBRXBDOztPQUVHO0lBQ0gsbUNBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWE7U0FDcEMsQ0FBQztJQUNKLENBQUM7SUFFRCxrRkFBa0Y7SUFDbEYsOEZBQThGO0lBQzlGOzs7Ozs7Ozs7Ozs7T0FZRztJQUVILHdDQUFXLEdBQVg7UUFDRSxJQUFJLEdBQUcsR0FBYyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUM7UUFFekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDdkIsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbkMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNDLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLDJCQUFRLEdBQWYsVUFBZ0IsS0FBNkI7UUFDM0MsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUF0REQsSUFzREM7QUF0RFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbiBSZXF1ZXN0IGFzIEpTT04uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmV2b2tlVG9rZW5SZXF1ZXN0SnNvbiB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIHRva2VuX3R5cGVfaGludD86IHN0cmluZztcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZXZva2UgdG9rZW4gcmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzAwOSNzZWN0aW9uLTIuMVxuICovXG5leHBvcnQgY2xhc3MgUmV2b2tlVG9rZW5SZXF1ZXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdG9rZW46IHN0cmluZyxcbiAgICAgIHB1YmxpYyB0b2tlblR5cGVIaW50Pzogc3RyaW5nLFxuICAgICAgcHVibGljIGNsaWVudElkPzogc3RyaW5nLFxuICAgICAgcHVibGljIGNsaWVudFNlY3JldD86IHN0cmluZykge31cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIFRva2VuUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgKi9cbiAgdG9Kc29uKCk6IFJldm9rZVRva2VuUmVxdWVzdEpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgIHRva2VuX3R5cGVfaGludDogdGhpcy50b2tlblR5cGVIaW50LFxuICAgIH07XG4gIH1cblxuICAvLyBUT0RPOiBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI0NsaWVudEF1dGhlbnRpY2F0aW9uXG4gIC8vIHN1cHBvcnQgY2xpZW50X3NlY3JldF9iYXNpYyBhbmQgY2xpZW50X3NlY3JldF9wb3N0LCB0aGlzIGFsc28gYXBwbGllcyB0byB0aGUgdG9rZW4gZW5kcG9pbnRcbiAgLypuZWVkc0F1dGhlbnRpY2F0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNsaWVudElkICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jbGllbnRTZWNyZXQgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldEJhc2ljQXV0aG9yaXphdGlvbkhlYWRlcigpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5uZWVkc0F1dGhlbnRpY2F0aW9uKCkpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgY3JlZGVudGlhbHMgPSB0aGlzLmNsaWVudElkICsgJzonICsgdGhpcy5jbGllbnRTZWNyZXQ7XG4gICAgdmFyIGJhc2ljU2NoZW1lID0gYnRvYShjcmVkZW50aWFscyk7XG4gICAgcmV0dXJuICdCYXNpYyAnICsgYmFzaWNTY2hlbWU7XG4gIH0qL1xuXG4gIHRvU3RyaW5nTWFwKCk6IFN0cmluZ01hcCB7XG4gICAgbGV0IG1hcDogU3RyaW5nTWFwID0ge3Rva2VuOiB0aGlzLnRva2VufTtcblxuICAgIGlmICh0aGlzLnRva2VuVHlwZUhpbnQpIHtcbiAgICAgIG1hcFsndG9rZW5fdHlwZV9oaW50J10gPSB0aGlzLnRva2VuVHlwZUhpbnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2xpZW50SWQpIHtcbiAgICAgIG1hcFsnY2xpZW50X2lkJ10gPSB0aGlzLmNsaWVudElkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNsaWVudFNlY3JldCkge1xuICAgICAgbWFwWydjbGllbnRfc2VjcmV0J10gPSB0aGlzLmNsaWVudFNlY3JldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGlucHV0OiBSZXZva2VUb2tlblJlcXVlc3RKc29uKTogUmV2b2tlVG9rZW5SZXF1ZXN0IHtcbiAgICByZXR1cm4gbmV3IFJldm9rZVRva2VuUmVxdWVzdChpbnB1dC50b2tlbik7XG4gIH1cbn1cbiJdfQ==