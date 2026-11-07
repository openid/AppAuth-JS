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
exports.TestRequestor = exports.FetchRequestor = exports.JQueryRequestor = exports.Requestor = void 0;
const errors_1 = require("./errors");
/**
 * An class that abstracts away the ability to make an XMLHttpRequest.
 */
class Requestor {
}
exports.Requestor = Requestor;
/**
 * Uses $.ajax to makes the Ajax requests.
 */
class JQueryRequestor extends Requestor {
    xhr(settings) {
        // NOTE: using jquery to make XHR's as whatwg-fetch requires
        // that I target ES6.
        const xhr = $.ajax(settings);
        return new Promise((resolve, reject) => {
            xhr.then((data, textStatus, jqXhr) => {
                resolve(data);
            }, (jqXhr, textStatus, error) => {
                reject(new errors_1.AppAuthError(error));
            });
        });
    }
}
exports.JQueryRequestor = JQueryRequestor;
/**
 * Uses fetch API to make Ajax requests
 */
class FetchRequestor extends Requestor {
    xhr(settings) {
        if (!settings.url) {
            return Promise.reject(new errors_1.AppAuthError('A URL must be provided.'));
        }
        let url = new URL(settings.url);
        let requestInit = {};
        requestInit.method = settings.method;
        requestInit.mode = 'cors';
        if (settings.data) {
            if (settings.method && settings.method.toUpperCase() === 'POST') {
                requestInit.body = settings.data;
            }
            else {
                let searchParams = new URLSearchParams(settings.data);
                searchParams.forEach((value, key) => {
                    url.searchParams.append(key, value);
                });
            }
        }
        // Set the request headers
        requestInit.headers = {};
        if (settings.headers) {
            for (let i in settings.headers) {
                if (settings.headers.hasOwnProperty(i)) {
                    requestInit.headers[i] = settings.headers[i];
                }
            }
        }
        const isJsonDataType = settings.dataType && settings.dataType.toLowerCase() === 'json';
        // Set 'Accept' header value for json requests (Taken from
        // https://github.com/jquery/jquery/blob/e0d941156900a6bff7c098c8ea7290528e468cf8/src/ajax.js#L644
        // )
        if (isJsonDataType) {
            requestInit.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01';
        }
        return fetch(url.toString(), requestInit).then(response => {
            if (response.status >= 200 && response.status < 300) {
                const contentType = response.headers.get('content-type');
                if (isJsonDataType || (contentType && contentType.indexOf('application/json') !== -1)) {
                    return response.json();
                }
                else {
                    return response.text();
                }
            }
            else {
                return Promise.reject(new errors_1.AppAuthError(response.status.toString(), response.statusText));
            }
        });
    }
}
exports.FetchRequestor = FetchRequestor;
/**
 * Should be used only in the context of testing. Just uses the underlying
 * Promise to mock the behavior of the Requestor.
 */
class TestRequestor extends Requestor {
    constructor(promise) {
        super();
        this.promise = promise;
    }
    xhr(settings) {
        return this.promise; // unsafe cast
    }
}
exports.TestRequestor = TestRequestor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3hoci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7QUFFSCxxQ0FBc0M7QUFFdEM7O0dBRUc7QUFDSDtDQUVDOztBQUVEOztHQUVHO0FBQ0gscUJBQTZCLFNBQVEsU0FBUztJQUM1QyxHQUFHLENBQUksUUFBNEI7UUFDakMsNERBQTREO1FBQzVELHFCQUFxQjtRQUNyQixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxPQUFPLENBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDeEMsR0FBRyxDQUFDLElBQUksQ0FDSixDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQzFCLE9BQU8sQ0FBQyxJQUFTLENBQUMsQ0FBQztZQUNyQixDQUFDLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUMzQixNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjs7QUFHRDs7R0FFRztBQUNILG9CQUE0QixTQUFRLFNBQVM7SUFDM0MsR0FBRyxDQUFJLFFBQTRCO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUNELElBQUksR0FBRyxHQUFRLElBQUksR0FBRyxDQUFTLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLFdBQVcsR0FBZ0IsRUFBRSxDQUFDO1FBQ2xDLFdBQVcsQ0FB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Ii8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIEFuIGNsYXNzIHRoYXQgYWJzdHJhY3RzIGF3YXkgdGhlIGFiaWxpdHkgdG8gbWFrZSBhbiBYTUxIdHRwUmVxdWVzdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlcXVlc3RvciB7XG4gIGFic3RyYWN0IHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPjtcbn1cblxuLyoqXG4gKiBVc2VzICQuYWpheCB0byBtYWtlcyB0aGUgQWpheCByZXF1ZXN0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEpRdWVyeVJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XG4gICAgLy8gTk9URTogdXNpbmcganF1ZXJ5IHRvIG1ha2UgWEhSJ3MgYXMgd2hhdHdnLWZldGNoIHJlcXVpcmVzXG4gICAgLy8gdGhhdCBJIHRhcmdldCBFUzYuXG4gICAgY29uc3QgeGhyID0gJC5hamF4KHNldHRpbmdzKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgeGhyLnRoZW4oXG4gICAgICAgICAgKGRhdGEsIHRleHRTdGF0dXMsIGpxWGhyKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEgYXMgVCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoanFYaHIsIHRleHRTdGF0dXMsIGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QobmV3IEFwcEF1dGhFcnJvcihlcnJvcikpO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cblxuLyoqXG4gKiBVc2VzIGZldGNoIEFQSSB0byBtYWtlIEFqYXggcmVxdWVzdHNcbiAqL1xuZXhwb3J0IGNsYXNzIEZldGNoUmVxdWVzdG9yIGV4dGVuZHMgUmVxdWVzdG9yIHtcbiAgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcbiAgICBpZiAoIXNldHRpbmdzLnVybCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IoJ0EgVVJMIG11c3QgYmUgcHJvdmlkZWQuJykpO1xuICAgIH1cbiAgICBsZXQgdXJsOiBVUkwgPSBuZXcgVVJMKDxzdHJpbmc+c2V0dGluZ3MudXJsKTtcbiAgICBsZXQgcmVxdWVzdEluaXQ6IFJlcXVlc3RJbml0ID0ge307XG4gICAgcmVxdWVzdEluaXQubWV0aG9kID0gc2V0dGluZ3MubWV0aG9kO1xuICAgIHJlcXVlc3RJbml0Lm1vZGUgPSAnY29ycyc7XG5cbiAgICBpZiAoc2V0dGluZ3MuZGF0YSkge1xuICAgICAgaWYgKHNldHRpbmdzLm1ldGhvZCAmJiBzZXR0aW5ncy5tZXRob2QudG9VcHBlckNhc2UoKSA9PT0gJ1BPU1QnKSB7XG4gICAgICAgIHJlcXVlc3RJbml0LmJvZHkgPSA8c3RyaW5nPnNldHRpbmdzLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhzZXR0aW5ncy5kYXRhKTtcbiAgICAgICAgc2VhcmNoUGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+wqB7XG4gICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCBoZWFkZXJzXG4gICAgcmVxdWVzdEluaXQuaGVhZGVycyA9IHt9O1xuICAgIGlmIChzZXR0aW5ncy5oZWFkZXJzKSB7XG4gICAgICBmb3IgKGxldCBpIGluIHNldHRpbmdzLmhlYWRlcnMpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLmhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICByZXF1ZXN0SW5pdC5oZWFkZXJzW2ldID0gPHN0cmluZz5zZXR0aW5ncy5oZWFkZXJzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNKc29uRGF0YVR5cGUgPSBzZXR0aW5ncy5kYXRhVHlwZSAmJiBzZXR0aW5ncy5kYXRhVHlwZS50b0xvd2VyQ2FzZSgpID09PSAnanNvbic7XG5cbiAgICAvLyBTZXQgJ0FjY2VwdCcgaGVhZGVyIHZhbHVlIGZvciBqc29uIHJlcXVlc3RzIChUYWtlbiBmcm9tXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi9lMGQ5NDExNTY5MDBhNmJmZjdjMDk4YzhlYTcyOTA1MjhlNDY4Y2Y4L3NyYy9hamF4LmpzI0w2NDRcbiAgICAvLyApXG4gICAgaWYgKGlzSnNvbkRhdGFUeXBlKSB7XG4gICAgICByZXF1ZXN0SW5pdC5oZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHQsICovKjsgcT0wLjAxJztcbiAgICB9XG5cbiAgICByZXR1cm4gZmV0Y2godXJsLnRvU3RyaW5nKCksIHJlcXVlc3RJbml0KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcbiAgICAgICAgaWYgKGlzSnNvbkRhdGFUeXBlIHx8IChjb250ZW50VHlwZSAmJiBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgIT09IC0xKSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IocmVzcG9uc2Uuc3RhdHVzLnRvU3RyaW5nKCksIHJlc3BvbnNlLnN0YXR1c1RleHQpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3VsZCBiZSB1c2VkIG9ubHkgaW4gdGhlIGNvbnRleHQgb2YgdGVzdGluZy4gSnVzdCB1c2VzIHRoZSB1bmRlcmx5aW5nXG4gKiBQcm9taXNlIHRvIG1vY2sgdGhlIGJlaGF2aW9yIG9mIHRoZSBSZXF1ZXN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXN0UmVxdWVzdG9yIGV4dGVuZHMgUmVxdWVzdG9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIHByb21pc2U6IFByb21pc2U8YW55Pikge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlOyAgLy8gdW5zYWZlIGNhc3RcbiAgfVxufVxuIl19