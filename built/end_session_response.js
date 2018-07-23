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
 * Represents the EndSession Response type.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
var EndSessionResponse = /** @class */ (function () {
    function EndSessionResponse(state) {
        this.state = state;
    }
    EndSessionResponse.prototype.toJson = function () {
        return { state: this.state };
    };
    EndSessionResponse.fromJson = function (json) {
        return new EndSessionResponse(json.state);
    };
    return EndSessionResponse;
}());
exports.EndSessionResponse = EndSessionResponse;
/**
 * Represents the EndSession error response.
 * For more information look at:
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
var EndSessionError = /** @class */ (function () {
    function EndSessionError(error, errorDescription, errorUri, state) {
        this.error = error;
        this.errorDescription = errorDescription;
        this.errorUri = errorUri;
        this.state = state;
    }
    EndSessionError.prototype.toJson = function () {
        return {
            error: this.error,
            error_description: this.errorDescription,
            error_uri: this.errorUri,
            state: this.state
        };
    };
    EndSessionError.fromJson = function (json) {
        return new EndSessionError(json.error, json.error_description, json.error_uri, json.state);
    };
    return EndSessionError;
}());
exports.EndSessionError = EndSessionError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZW5kX3Nlc3Npb25fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFtQkg7Ozs7R0FJRztBQUNIO0lBQ0UsNEJBQW1CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQztJQUVwQyxtQ0FBTSxHQUFOO1FBQ0UsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLDJCQUFRLEdBQWYsVUFBZ0IsSUFBNEI7UUFDMUMsT0FBTyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLGdEQUFrQjtBQVkvQjs7OztHQUlHO0FBQ0g7SUFDRSx5QkFDVyxLQUFhLEVBQ2IsZ0JBQXlCLEVBQ3pCLFFBQWlCLEVBQ2pCLEtBQWM7UUFIZCxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFTO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBUztJQUFHLENBQUM7SUFFN0IsZ0NBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN4QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBRU0sd0JBQVEsR0FBZixVQUFnQixJQUF5QjtRQUN2QyxPQUFPLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFbmRTZXNzaW9uUmVzcG9uc2UgYXMgYSBKU09OIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRTZXNzaW9uUmVzcG9uc2VKc29uIHtcbiAgc3RhdGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFbmRTZXNzaW9uRXJyb3IgYXMgYSBKU09OIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRTZXNzaW9uRXJyb3JKc29uIHtcbiAgZXJyb3I6IHN0cmluZztcbiAgZXJyb3JfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGVycm9yX3VyaT86IHN0cmluZztcbiAgc3RhdGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRW5kU2Vzc2lvbiBSZXNwb25zZSB0eXBlLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdFxuICogaHR0cDovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3Qtc2Vzc2lvbi0xXzAuaHRtbFxuICovXG5leHBvcnQgY2xhc3MgRW5kU2Vzc2lvblJlc3BvbnNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0YXRlOiBzdHJpbmcpIHt9XG5cbiAgdG9Kc29uKCk6IEVuZFNlc3Npb25SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiB7c3RhdGU6IHRoaXMuc3RhdGV9O1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGpzb246IEVuZFNlc3Npb25SZXNwb25zZUpzb24pOiBFbmRTZXNzaW9uUmVzcG9uc2Uge1xuICAgIHJldHVybiBuZXcgRW5kU2Vzc2lvblJlc3BvbnNlKGpzb24uc3RhdGUpO1xuICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgRW5kU2Vzc2lvbiBlcnJvciByZXNwb25zZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1zZXNzaW9uLTFfMC5odG1sXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmRTZXNzaW9uRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBlcnJvcjogc3RyaW5nLFxuICAgICAgcHVibGljIGVycm9yRGVzY3JpcHRpb24/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgZXJyb3JVcmk/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgc3RhdGU/OiBzdHJpbmcpIHt9XG5cbiAgdG9Kc29uKCk6IEVuZFNlc3Npb25FcnJvckpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogdGhpcy5lcnJvcixcbiAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiB0aGlzLmVycm9yRGVzY3JpcHRpb24sXG4gICAgICBlcnJvcl91cmk6IHRoaXMuZXJyb3JVcmksXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oanNvbjogRW5kU2Vzc2lvbkVycm9ySnNvbik6IEVuZFNlc3Npb25FcnJvciB7XG4gICAgcmV0dXJuIG5ldyBFbmRTZXNzaW9uRXJyb3IoanNvbi5lcnJvciwganNvbi5lcnJvcl9kZXNjcmlwdGlvbiwganNvbi5lcnJvcl91cmksIGpzb24uc3RhdGUpO1xuICB9XG59XG4iXX0=