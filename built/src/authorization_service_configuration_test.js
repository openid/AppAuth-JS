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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { TestRequestor } from './xhr';
describe('Authorization Service Configuration Tests', () => {
    const authorizationEndpoint = 'authorization://endpoint';
    const tokenEndpoint = 'token://endpoint';
    const revocationEndpoint = 'revocation://endpoint';
    const userInfoEndpoint = 'userInfo://endpoint';
    const endSessionEndpoint = 'endSession://endpoint';
    let configuration = new AuthorizationServiceConfiguration({
        authorization_endpoint: authorizationEndpoint,
        token_endpoint: tokenEndpoint,
        revocation_endpoint: revocationEndpoint,
        userinfo_endpoint: userInfoEndpoint,
        end_session_endpoint: endSessionEndpoint,
    });
    it('Initialization should work', () => {
        expect(configuration).toBeTruthy();
        expect(configuration.authorizationEndpoint).toBe(authorizationEndpoint);
        expect(configuration.tokenEndpoint).toBe(tokenEndpoint);
        expect(configuration.revocationEndpoint).toBe(revocationEndpoint);
        expect(configuration.endSessionEndpoint).toBe(endSessionEndpoint);
        expect(configuration.userInfoEndpoint).toBe(userInfoEndpoint);
    });
    it('Conversion to Json and back should work', () => {
        let json = configuration.toJson();
        let newConfiguration = new AuthorizationServiceConfiguration(json);
        expect(newConfiguration).toBeTruthy();
        expect(newConfiguration.authorizationEndpoint).toBe(configuration.authorizationEndpoint);
        expect(newConfiguration.tokenEndpoint).toBe(configuration.tokenEndpoint);
        expect(newConfiguration.revocationEndpoint).toBe(configuration.revocationEndpoint);
        expect(configuration.endSessionEndpoint).toBe(endSessionEndpoint);
        expect(configuration.userInfoEndpoint).toBe(userInfoEndpoint);
    });
    describe('Tests with dependencies', () => {
        it('Fetch from issuer tests should work', () => __awaiter(void 0, void 0, void 0, function* () {
            let promise = Promise.resolve(configuration.toJson());
            let requestor = new TestRequestor(promise);
            const result = yield AuthorizationServiceConfiguration.fetchFromIssuer('some://endpoint', requestor);
            expect(result).toBeTruthy();
            expect(result.authorizationEndpoint).toBe(configuration.authorizationEndpoint);
            expect(result.tokenEndpoint).toBe(configuration.tokenEndpoint);
            expect(result.revocationEndpoint).toBe(configuration.revocationEndpoint);
            expect(configuration.endSessionEndpoint).toBe(endSessionEndpoint);
            expect(configuration.userInfoEndpoint).toBe(userInfoEndpoint);
        }));
        it('Fetch from issuer tests should work', () => __awaiter(void 0, void 0, void 0, function* () {
            let promise = Promise.reject(new Error('Something bad happened.'));
            let requestor = new TestRequestor(promise);
            try {
                yield AuthorizationServiceConfiguration.fetchFromIssuer('some://endpoint', requestor);
            }
            catch (result) {
                expect(result).toBeTruthy();
                let error = result;
                expect(error.message).toBe('Something bad happened.');
            }
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb25fdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbl90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7Ozs7Ozs7OztBQUVILE9BQU8sRUFBQyxpQ0FBaUMsRUFBd0MsTUFBTSx1Q0FBdUMsQ0FBQztBQUUvSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBRXBDLFFBQVEsQ0FBQywyQ0FBMkMsRUFBRSxHQUFHLEVBQUU7SUFDekQsTUFBTSxxQkFBcUIsR0FBRywwQkFBMEIsQ0FBQztJQUN6RCxNQUFNLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztJQUN6QyxNQUFNLGtCQUFrQixHQUFHLHVCQUF1QixDQUFDO0lBQ25ELE1BQU0sZ0JBQWdCLEdBQUcscUJBQXFCLENBQUM7SUFDL0MsTUFBTSxrQkFBa0IsR0FBRyx1QkFBdUIsQ0FBQztJQUVuRCxJQUFJLGFBQWEsR0FBRyxJQUFJLGlDQUFpQyxDQUFDO1FBQ3hELHNCQUFzQixFQUFFLHFCQUFxQjtRQUM3QyxjQUFjLEVBQUUsYUFBYTtRQUM3QixtQkFBbUIsRUFBRSxrQkFBa0I7UUFDdkMsaUJBQWlCLEVBQUUsZ0JBQWdCO1FBQ25DLG9CQUFvQixFQUFFLGtCQUFrQjtLQUN6QyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1FBQ3BDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQs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TSxFQUFFLENBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxLQUFLLEdBQUcsTUFBc0IsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN4RCxDQUFDO1FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbkpzb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtBcHBBdXRoRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7VGVzdFJlcXVlc3Rvcn0gZnJvbSAnLi94aHInO1xuXG5kZXNjcmliZSgnQXV0aG9yaXphdGlvbiBTZXJ2aWNlIENvbmZpZ3VyYXRpb24gVGVzdHMnLCAoKSA9PiB7XG4gIGNvbnN0IGF1dGhvcml6YXRpb25FbmRwb2ludCA9ICdhdXRob3JpemF0aW9uOi8vZW5kcG9pbnQnO1xuICBjb25zdCB0b2tlbkVuZHBvaW50ID0gJ3Rva2VuOi8vZW5kcG9pbnQnO1xuICBjb25zdCByZXZvY2F0aW9uRW5kcG9pbnQgPSAncmV2b2NhdGlvbjovL2VuZHBvaW50JztcbiAgY29uc3QgdXNlckluZm9FbmRwb2ludCA9ICd1c2VySW5mbzovL2VuZHBvaW50JztcbiAgY29uc3QgZW5kU2Vzc2lvbkVuZHBvaW50ID0gJ2VuZFNlc3Npb246Ly9lbmRwb2ludCc7XG5cbiAgbGV0IGNvbmZpZ3VyYXRpb24gPSBuZXcgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uKHtcbiAgICBhdXRob3JpemF0aW9uX2VuZHBvaW50OiBhdXRob3JpemF0aW9uRW5kcG9pbnQsXG4gICAgdG9rZW5fZW5kcG9pbnQ6IHRva2VuRW5kcG9pbnQsXG4gICAgcmV2b2NhdGlvbl9lbmRwb2ludDogcmV2b2NhdGlvbkVuZHBvaW50LFxuICAgIHVzZXJpbmZvX2VuZHBvaW50OiB1c2VySW5mb0VuZHBvaW50LFxuICAgIGVuZF9zZXNzaW9uX2VuZHBvaW50OiBlbmRTZXNzaW9uRW5kcG9pbnQsXG4gIH0pO1xuXG4gIGl0KCdJbml0aWFsaXphdGlvbiBzaG91bGQgd29yaycsICgpID0+IHtcbiAgICBleHBlY3QoY29uZmlndXJhdGlvbikudG9CZVRydXRoeSgpO1xuICAgIGV4cGVjdChjb25maWd1cmF0aW9uLmF1dGhvcml6YXRpb25FbmRwb2ludCkudG9CZShhdXRob3JpemF0aW9uRW5kcG9pbnQpO1xuICAgIGV4cGVjdChjb25maWd1cmF0aW9uLnRva2VuRW5kcG9pbnQpLnRvQmUodG9rZW5FbmRwb2ludCk7XG4gICAgZXhwZWN0KGNvbmZpZ3VyYXRpb24ucmV2b2NhdGlvbkVuZHBvaW50KS50b0JlKHJldm9jYXRpb25FbmRwb2ludCk7XG4gICAgZXhwZWN0KGNvbmZpZ3VyYXRpb24uZW5kU2Vzc2lvbkVuZHBvaW50KS50b0JlKGVuZFNlc3Npb25FbmRwb2ludCk7XG4gICAgZXhwZWN0KGNvbmZpZ3VyYXRpb24udXNlckluZm9FbmRwb2ludCkudG9CZSh1c2VySW5mb0VuZHBvaW50KTtcbiAgfSk7XG5cbiAgaXQoJ0NvbnZlcnNpb24gdG8gSnNvbiBhbmQgYmFjayBzaG91bGQgd29yaycsICgpID0+IHtcbiAgICBsZXQganNvbiA9IGNvbmZpZ3VyYXRpb24udG9Kc29uKCk7XG4gICAgbGV0IG5ld0NvbmZpZ3VyYXRpb24gPSBuZXcgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uKGpzb24pO1xuICAgIGV4cGVjdChuZXdDb25maWd1cmF0aW9uKS50b0JlVHJ1dGh5KCk7XG4gICAgZXhwZWN0KG5ld0NvbmZpZ3VyYXRpb24uYXV0aG9yaXphdGlvbkVuZHBvaW50KS50b0JlKGNvbmZpZ3VyYXRpb24uYXV0aG9yaXphdGlvbkVuZHBvaW50KTtcbiAgICBleHBlY3QobmV3Q29uZmlndXJhdGlvbi50b2tlbkVuZHBvaW50KS50b0JlKGNvbmZpZ3VyYXRpb24udG9rZW5FbmRwb2ludCk7XG4gICAgZXhwZWN0KG5ld0NvbmZpZ3VyYXRpb24ucmV2b2NhdGlvbkVuZHBvaW50KS50b0JlKGNvbmZpZ3VyYXRpb24ucmV2b2NhdGlvbkVuZHBvaW50KTtcbiAgICBleHBlY3QoY29uZmlndXJhdGlvbi5lbmRTZXNzaW9uRW5kcG9pbnQpLnRvQmUoZW5kU2Vzc2lvbkVuZHBvaW50KTtcbiAgICBleHBlY3QoY29uZmlndXJhdGlvbi51c2VySW5mb0VuZHBvaW50KS50b0JlKHVzZXJJbmZvRW5kcG9pbnQpO1xuICB9KTtcblxuICBkZXNjcmliZSgnVGVzdHMgd2l0aCBkZXBlbmRlbmNpZXMnLCAoKSA9PiB7XG4gICAgaXQoJ0ZldGNoIGZyb20gaXNzdWVyIHRlc3RzIHNob3VsZCB3b3JrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHByb21pc2U6IFByb21pc2U8QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uSnNvbj4gPVxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZShjb25maWd1cmF0aW9uLnRvSnNvbigpKTtcbiAgICAgIGxldCByZXF1ZXN0b3IgPSBuZXcgVGVzdFJlcXVlc3Rvcihwcm9taXNlKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9XG4gICAgICAgICAgYXdhaXQgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLmZldGNoRnJvbUlzc3Vlcignc29tZTovL2VuZHBvaW50JywgcmVxdWVzdG9yKVxuICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZVRydXRoeSgpO1xuICAgICAgZXhwZWN0KHJlc3VsdC5hdXRob3JpemF0aW9uRW5kcG9pbnQpLnRvQmUoY29uZmlndXJhdGlvbi5hdXRob3JpemF0aW9uRW5kcG9pbnQpO1xuICAgICAgZXhwZWN0KHJlc3VsdC50b2tlbkVuZHBvaW50KS50b0JlKGNvbmZpZ3VyYXRpb24udG9rZW5FbmRwb2ludCk7XG4gICAgICBleHBlY3QocmVzdWx0LnJldm9jYXRpb25FbmRwb2ludCkudG9CZShjb25maWd1cmF0aW9uLnJldm9jYXRpb25FbmRwb2ludCk7XG4gICAgICBleHBlY3QoY29uZmlndXJhdGlvbi5lbmRTZXNzaW9uRW5kcG9pbnQpLnRvQmUoZW5kU2Vzc2lvbkVuZHBvaW50KTtcbiAgICAgIGV4cGVjdChjb25maWd1cmF0aW9uLnVzZXJJbmZvRW5kcG9pbnQpLnRvQmUodXNlckluZm9FbmRwb2ludCk7XG4gICAgfSk7XG5cbiAgICBpdCgnRmV0Y2ggZnJvbSBpc3N1ZXIgdGVzdHMgc2hvdWxkIHdvcmsnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcHJvbWlzZTogUHJvbWlzZTxBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25Kc29uPiA9XG4gICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkLicpKTtcbiAgICAgIGxldCByZXF1ZXN0b3IgPSBuZXcgVGVzdFJlcXVlc3Rvcihwcm9taXNlKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbi5mZXRjaEZyb21Jc3N1ZXIoJ3NvbWU6Ly9lbmRwb2ludCcsIHJlcXVlc3RvcilcbiAgICAgIH0gY2F0Y2ggKHJlc3VsdCkge1xuICAgICAgICBleHBlY3QocmVzdWx0KS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGxldCBlcnJvciA9IHJlc3VsdCBhcyBBcHBBdXRoRXJyb3I7XG4gICAgICAgIGV4cGVjdChlcnJvci5tZXNzYWdlKS50b0JlKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkLicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19