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
import { AppAuthError } from './errors';
/**
 * An class that abstracts away the ability to make an XMLHttpRequest.
 */
export class Requestor {
}
/**
 * Uses $.ajax to makes the Ajax requests.
 */
export class JQueryRequestor extends Requestor {
    xhr(settings) {
        // NOTE: using jquery to make XHR's as whatwg-fetch requires
        // that I target ES6.
        const xhr = $.ajax(settings);
        return new Promise((resolve, reject) => {
            xhr.then((data, textStatus, jqXhr) => {
                resolve(data);
            }, (jqXhr, textStatus, error) => {
                reject(new AppAuthError(error));
            });
        });
    }
}
/**
 * Uses fetch API to make Ajax requests
 */
export class FetchRequestor extends Requestor {
    xhr(settings) {
        if (!settings.url) {
            return Promise.reject(new AppAuthError('A URL must be provided.'));
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
                return Promise.reject(new AppAuthError(response.status.toString(), response.statusText));
            }
        });
    }
}
/**
 * Should be used only in the context of testing. Just uses the underlying
 * Promise to mock the behavior of the Requestor.
 */
export class TestRequestor extends Requestor {
    constructor(promise) {
        super();
        this.promise = promise;
    }
    xhr(settings) {
        return this.promise; // unsafe cast
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3hoci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRXRDOztHQUVHO0FBQ0gsTUFBTSxPQUFnQixTQUFTO0NBRTlCO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxTQUFTO0lBQzVDLEdBQUcsQ0FBSSxRQUE0QjtRQUNqQyw0REFBNEQ7UUFDNUQscUJBQXFCO1FBQ3JCLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN4QyxHQUFHLENBQUMsSUFBSSxDQUNKLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLElBQVMsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsRUFDRCxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQzNCLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFHRDs7R0FFRztBQUNILE1BQU0sT0FBTyxjQUFlLFNBQVEsU0FBUztJQUMzQyxHQUFHLENBQUksUUFBNEI7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNsQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFDRCxJQUFJLEdBQUcsR0FBUSxJQUFJLEdBQUcsQ0FBUyxRQUFRLENBQUMsR0FBRyxDQUFD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QUMsT0FBTyxDQUFDLENBQUUsY0FBYztJQUN0QyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBcHBBdXRoRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gKiBBbiBjbGFzcyB0aGF0IGFic3RyYWN0cyBhd2F5IHRoZSBhYmlsaXR5IHRvIG1ha2UgYW4gWE1MSHR0cFJlcXVlc3QuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXF1ZXN0b3Ige1xuICBhYnN0cmFjdCB4aHI8VD4oc2V0dGluZ3M6IEpRdWVyeUFqYXhTZXR0aW5ncyk6IFByb21pc2U8VD47XG59XG5cbi8qKlxuICogVXNlcyAkLmFqYXggdG8gbWFrZXMgdGhlIEFqYXggcmVxdWVzdHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBKUXVlcnlSZXF1ZXN0b3IgZXh0ZW5kcyBSZXF1ZXN0b3Ige1xuICB4aHI8VD4oc2V0dGluZ3M6IEpRdWVyeUFqYXhTZXR0aW5ncyk6IFByb21pc2U8VD4ge1xuICAgIC8vIE5PVEU6IHVzaW5nIGpxdWVyeSB0byBtYWtlIFhIUidzIGFzIHdoYXR3Zy1mZXRjaCByZXF1aXJlc1xuICAgIC8vIHRoYXQgSSB0YXJnZXQgRVM2LlxuICAgIGNvbnN0IHhociA9ICQuYWpheChzZXR0aW5ncyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHhoci50aGVuKFxuICAgICAgICAgIChkYXRhLCB0ZXh0U3RhdHVzLCBqcVhocikgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhIGFzIFQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGpxWGhyLCB0ZXh0U3RhdHVzLCBlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IoZXJyb3IpKTtcbiAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5cbi8qKlxuICogVXNlcyBmZXRjaCBBUEkgdG8gbWFrZSBBamF4IHJlcXVlc3RzXG4gKi9cbmV4cG9ydCBjbGFzcyBGZXRjaFJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XG4gICAgaWYgKCFzZXR0aW5ncy51cmwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgQXBwQXV0aEVycm9yKCdBIFVSTCBtdXN0IGJlIHByb3ZpZGVkLicpKTtcbiAgICB9XG4gICAgbGV0IHVybDogVVJMID0gbmV3IFVSTCg8c3RyaW5nPnNldHRpbmdzLnVybCk7XG4gICAgbGV0IHJlcXVlc3RJbml0OiBSZXF1ZXN0SW5pdCA9IHt9O1xuICAgIHJlcXVlc3RJbml0Lm1ldGhvZCA9IHNldHRpbmdzLm1ldGhvZDtcbiAgICByZXF1ZXN0SW5pdC5tb2RlID0gJ2NvcnMnO1xuXG4gICAgaWYgKHNldHRpbmdzLmRhdGEpIHtcbiAgICAgIGlmIChzZXR0aW5ncy5tZXRob2QgJiYgc2V0dGluZ3MubWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09ICdQT1NUJykge1xuICAgICAgICByZXF1ZXN0SW5pdC5ib2R5ID0gPHN0cmluZz5zZXR0aW5ncy5kYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoc2V0dGluZ3MuZGF0YSk7XG4gICAgICAgIHNlYXJjaFBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PsKge1xuICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgaGVhZGVyc1xuICAgIHJlcXVlc3RJbml0LmhlYWRlcnMgPSB7fTtcbiAgICBpZiAoc2V0dGluZ3MuaGVhZGVycykge1xuICAgICAgZm9yIChsZXQgaSBpbiBzZXR0aW5ncy5oZWFkZXJzKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5oZWFkZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgcmVxdWVzdEluaXQuaGVhZGVyc1tpXSA9IDxzdHJpbmc+c2V0dGluZ3MuaGVhZGVyc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGlzSnNvbkRhdGFUeXBlID0gc2V0dGluZ3MuZGF0YVR5cGUgJiYgc2V0dGluZ3MuZGF0YVR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2pzb24nO1xuXG4gICAgLy8gU2V0ICdBY2NlcHQnIGhlYWRlciB2YWx1ZSBmb3IganNvbiByZXF1ZXN0cyAoVGFrZW4gZnJvbVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvZTBkOTQxMTU2OTAwYTZiZmY3YzA5OGM4ZWE3MjkwNTI4ZTQ2OGNmOC9zcmMvYWpheC5qcyNMNjQ0XG4gICAgLy8gKVxuICAgIGlmIChpc0pzb25EYXRhVHlwZSkge1xuICAgICAgcmVxdWVzdEluaXQuaGVhZGVyc1snQWNjZXB0J10gPSAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9qYXZhc2NyaXB0LCAqLyo7IHE9MC4wMSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZldGNoKHVybC50b1N0cmluZygpLCByZXF1ZXN0SW5pdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk7XG4gICAgICAgIGlmIChpc0pzb25EYXRhVHlwZSB8fCAoY29udGVudFR5cGUgJiYgY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpICE9PSAtMSkpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgQXBwQXV0aEVycm9yKHJlc3BvbnNlLnN0YXR1cy50b1N0cmluZygpLCByZXNwb25zZS5zdGF0dXNUZXh0KSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG91bGQgYmUgdXNlZCBvbmx5IGluIHRoZSBjb250ZXh0IG9mIHRlc3RpbmcuIEp1c3QgdXNlcyB0aGUgdW5kZXJseWluZ1xuICogUHJvbWlzZSB0byBtb2NrIHRoZSBiZWhhdmlvciBvZiB0aGUgUmVxdWVzdG9yLlxuICovXG5leHBvcnQgY2xhc3MgVGVzdFJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9taXNlOiBQcm9taXNlPGFueT4pIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZTsgIC8vIHVuc2FmZSBjYXN0XG4gIH1cbn1cbiJdfQ==