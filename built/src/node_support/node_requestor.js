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
import * as Url from 'url';
import { AppAuthError } from '../errors';
import { log } from '../logger';
import { Requestor } from '../xhr';
import followRedirects from 'follow-redirects';
const https = followRedirects.https;
const http = followRedirects.http;
/**
 * A Node.js HTTP client.
 */
export class NodeRequestor extends Requestor {
    xhr(settings) {
        return new Promise((resolve, reject) => {
            // implementing a subset that is required.
            const url = Url.parse(settings.url);
            const data = settings.data;
            const options = {
                hostname: url.hostname,
                port: url.port,
                path: url.path,
                method: settings.method,
                headers: settings.headers || {}
            };
            if (data) {
                options.headers['Content-Length'] = String(data.toString().length);
            }
            let protocol = https;
            if (url.protocol && url.protocol.toLowerCase() === 'http:') {
                protocol = http;
            }
            const request = protocol.request(options, (response) => {
                if (response.statusCode !== 200) {
                    log('Request ended with an error ', response.statusCode);
                    reject(new AppAuthError(response.statusMessage));
                }
                const chunks = [];
                response.on('data', (chunk) => {
                    chunks.push(chunk.toString());
                });
                response.on('end', () => {
                    const body = chunks.join('');
                    if (settings.dataType === 'json') {
                        try {
                            resolve(JSON.parse(body));
                        }
                        catch (err) {
                            log('Could not parse json response', body);
                        }
                    }
                    else {
                        resolve(body);
                    }
                });
            });
            request.on('error', (e) => {
                reject(new AppAuthError(e.toString()));
            });
            if (data) {
                request.write(data);
            }
            request.end();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUlILE9BQU8sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDdkMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM5QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBRWpDLE9BQU8sZUFBZSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE1BQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUM7QUFDcEMsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztBQUVsQzs7R0FFRztBQUNILE1BQU0sT0FBTyxhQUFjLFNBQVEsU0FBUztJQUMxQyxHQUFHLENBQUksUUFBNEI7UUFDakMsT0FBTyxJQUFJLE9BQU8sQ0FBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN4QywwQ0FBMEM7WUFDMUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBSSxDQUFDLENBQUM7WUFDckMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUUzQixNQUFNLE9BQU8sR0FBRztnQkFDZCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtnQkFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0JBQ2QsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sSUFBSSxFQUFFO2FBQ2hDLENBQUM7WUFFRixJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNULE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JFLENBQUM7WUFFRCxJQUFJLFFBQVEsR0FBUSxLQUFLLENBQUM7WUFDMUIsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBQzNELFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDbEIsQ0FBQztZQUVELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBd0IsRUFBRSxFQUFFO2dCQUNyRSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ2hDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pELE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsQ0FBQztnQkFFRCxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7Z0JBQzVCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUU7b0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRSxDQUFDO3dCQUNqQyxJQUFJLENBQUM7NEJBQ0gsT0FBTyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFjLENBQUMsQ0FBQzt3QkFDMUMsQ0FBQzt3QkFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOzRCQUNiLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDN0MsQ0FBQztvQkFDSCxDQUFDO3lCQUFNLENBQUM7d0JBQ04sT0FBTyxDQUFFLElBQWlCLENBQUMsQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRTtnQkFDL0IsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBCdWZmZXIgZnJvbSAnYnVmZmVyJztcbmltcG9ydCB7U2VydmVyUmVzcG9uc2V9IGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgVXJsIGZyb20gJ3VybCc7XG5cbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuLi9lcnJvcnMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQge1JlcXVlc3Rvcn0gZnJvbSAnLi4veGhyJztcblxuaW1wb3J0IGZvbGxvd1JlZGlyZWN0cyBmcm9tICdmb2xsb3ctcmVkaXJlY3RzJztcbmNvbnN0IGh0dHBzID0gZm9sbG93UmVkaXJlY3RzLmh0dHBzO1xuY29uc3QgaHR0cCA9IGZvbGxvd1JlZGlyZWN0cy5odHRwO1xuXG4vKipcbiAqIEEgTm9kZS5qcyBIVFRQIGNsaWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vZGVSZXF1ZXN0b3IgZXh0ZW5kcyBSZXF1ZXN0b3Ige1xuICB4aHI8VD4oc2V0dGluZ3M6IEpRdWVyeUFqYXhTZXR0aW5ncyk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBpbXBsZW1lbnRpbmcgYSBzdWJzZXQgdGhhdCBpcyByZXF1aXJlZC5cbiAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZShzZXR0aW5ncy51cmwhKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBzZXR0aW5ncy5kYXRhO1xuXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBob3N0bmFtZTogdXJsLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmwucG9ydCxcbiAgICAgICAgcGF0aDogdXJsLnBhdGgsXG4gICAgICAgIG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBzZXR0aW5ncy5oZWFkZXJzIHx8IHt9XG4gICAgICB9O1xuXG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBvcHRpb25zLmhlYWRlcnNbJ0NvbnRlbnQtTGVuZ3RoJ10gPSBTdHJpbmcoZGF0YS50b1N0cmluZygpLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBwcm90b2NvbDogYW55ID0gaHR0cHM7XG4gICAgICBpZiAodXJsLnByb3RvY29sICYmIHVybC5wcm90b2NvbC50b0xvd2VyQ2FzZSgpID09PSAnaHR0cDonKSB7XG4gICAgICAgIHByb3RvY29sID0gaHR0cDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVxdWVzdCA9IHByb3RvY29sLnJlcXVlc3Qob3B0aW9ucywgKHJlc3BvbnNlOiBTZXJ2ZXJSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgbG9nKCdSZXF1ZXN0IGVuZGVkIHdpdGggYW4gZXJyb3IgJywgcmVzcG9uc2Uuc3RhdHVzQ29kZSk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IocmVzcG9uc2Uuc3RhdHVzTWVzc2FnZSEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNodW5rczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNwb25zZS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJvZHkgPSBjaHVua3Muam9pbignJyk7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmRhdGFUeXBlID09PSAnanNvbicpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKEpTT04ucGFyc2UoYm9keSkgYXMgYW55KSBhcyBUKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICBsb2coJ0NvdWxkIG5vdCBwYXJzZSBqc29uIHJlc3BvbnNlJywgYm9keSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoKGJvZHkgYXMgYW55KSBhcyBUKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgKGU6IEVycm9yKSA9PiB7XG4gICAgICAgIHJlamVjdChuZXcgQXBwQXV0aEVycm9yKGUudG9TdHJpbmcoKSkpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIHJlcXVlc3Qud3JpdGUoZGF0YSk7XG4gICAgICB9XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=