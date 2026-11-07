"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const authorization_request_1 = require("./authorization_request");
describe('AuthorizationRequest Tests', () => {
    const clientId = 'client_id';
    const redirectUri = 'http://my/redirect_uri';
    const scope = 'scope';
    const state = 'state';
    const extras = { key: 'value' };
    let jsonRequest = {
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_CODE,
        scope: scope,
        state: state,
        extras: extras
    };
    let jsonRequest2 = {
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_CODE,
        scope: scope,
        state: undefined,
        extras: extras
    };
    let jsonRequest3 = {
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_TOKEN,
        scope: scope,
        state: undefined,
        extras: extras
    };
    let request = new authorization_request_1.AuthorizationRequest(jsonRequest);
    let request2 = new authorization_request_1.AuthorizationRequest(jsonRequest2);
    it('Basic Authorization Request Tests', () => {
        expect(request).not.toBeNull();
        expect(request.responseType).toBe(authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_CODE);
        expect(request.clientId).toBe(clientId);
        expect(request.redirectUri).toBe(redirectUri);
        expect(request.scope).toBe(scope);
        expect(request.state).toBe(state);
        expect(request.extras).toBeTruthy();
        expect(request.extras['key']).toBe('value');
        expect(request.extras).toEqual(extras);
    });
    it('To Json() and from Json() should work', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.toJson();
        let json = JSON.parse(JSON.stringify(result));
        expect(json).not.toBeNull();
        let newRequest = new authorization_request_1.AuthorizationRequest(json);
        expect(newRequest).not.toBeNull();
        expect(newRequest.responseType).toBe(authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_CODE);
        expect(newRequest.clientId).toBe(clientId);
        expect(newRequest.redirectUri).toBe(redirectUri);
        expect(newRequest.scope).toBe(scope);
        expect(newRequest.state).toBe(state);
        expect(newRequest.extras).toBeTruthy();
        expect(newRequest.extras['key']).toBe('value');
        expect(newRequest.extras).toEqual(request.extras);
        expect(newRequest.internal).toEqual(request.internal);
    }));
    it('Expect cryptographic newState() to populate state', () => {
        expect(request2.state).not.toBeNull();
    });
    it('Support response_type TOKEN', () => {
        let request3 = new authorization_request_1.AuthorizationRequest(jsonRequest3);
        expect(request3.responseType).toBe(authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_TOKEN);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0X3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxtRUFBdUY7QUFHdkYsUUFBUSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsRUFBRTtJQUMxQyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDN0IsTUFBTSxXQUFXLEdBQUcsd0JBQXdCLENBQUM7SUFDN0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDO0lBQ3RCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQztJQUN0QixNQUFNLE1BQU0sR0FBYyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUMsQ0FBQztJQUV6QyxJQUFJLFdBQVcsR0FBNkI7UUFDMUMsU0FBUyxFQUFFLFFBQVE7UUFDbkIsWUFBWSxFQUFFLFdBQVc7UUFDekIsYUFBYSxFQUFFLDRDQUFvQixDQUFDLGtCQUFrQjtRQUN0RCxLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLE1BQU07S0FDZixDQUFDO0lBRUYsSUFBSSxZQUFZLEdBQTZCO1FBQzNDLFNBQVMsRUFBRSxRQUFRO1FBQ25CLFlBQVksRUFBRSxXQUFXO1FBQ3pCLGFBQWEsRUFBRSw0Q0FBb0IsQ0FBQyxrQkFBa0I7UUFDdEQsS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsU0FBUztRQUNoQixNQUFNLEVBQUUsTUFBTTtLQUNmLENBQUM7SUFFRixJQUFJLFlBQVksR0FBNkI7UUFDM0MsU0FBUyxFQUFFLFFBQVE7UUFDbkIsWUFBWSxFQUFFLFdBQVc7UUFDekIsYUFBYSxFQUFFLDRDQUFvQixDQUFDLG1CQUFtQjtRQUN2RCxLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSxTQUFTO1FBQ2hCLE1BQU0sRUFB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LEVBQUUsR0FBRyxFQUFFO1FBQzNELE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtRQUNyQyxJQUFJLFFBQVEsR0FBeUIsSUFBSSw0Q0FBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1RSxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyw0Q0FBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9FLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3QsIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG5kZXNjcmliZSgnQXV0aG9yaXphdGlvblJlcXVlc3QgVGVzdHMnLCAoKSA9PiB7XG4gIGNvbnN0IGNsaWVudElkID0gJ2NsaWVudF9pZCc7XG4gIGNvbnN0IHJlZGlyZWN0VXJpID0gJ2h0dHA6Ly9teS9yZWRpcmVjdF91cmknO1xuICBjb25zdCBzY29wZSA9ICdzY29wZSc7XG4gIGNvbnN0IHN0YXRlID0gJ3N0YXRlJztcbiAgY29uc3QgZXh0cmFzOiBTdHJpbmdNYXAgPSB7a2V5OiAndmFsdWUnfTtcblxuICBsZXQganNvblJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiA9IHtcbiAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmksXG4gICAgcmVzcG9uc2VfdHlwZTogQXV0aG9yaXphdGlvblJlcXVlc3QuUkVTUE9OU0VfVFlQRV9DT0RFLFxuICAgIHNjb3BlOiBzY29wZSxcbiAgICBzdGF0ZTogc3RhdGUsXG4gICAgZXh0cmFzOiBleHRyYXNcbiAgfTtcblxuICBsZXQganNvblJlcXVlc3QyOiBBdXRob3JpemF0aW9uUmVxdWVzdEpzb24gPSB7XG4gICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICByZWRpcmVjdF91cmk6IHJlZGlyZWN0VXJpLFxuICAgIHJlc3BvbnNlX3R5cGU6IEF1dGhvcml6YXRpb25SZXF1ZXN0LlJFU1BPTlNFX1RZUEVfQ09ERSxcbiAgICBzY29wZTogc2NvcGUsXG4gICAgc3RhdGU6IHVuZGVmaW5lZCxcbiAgICBleHRyYXM6IGV4dHJhc1xuICB9O1xuXG4gIGxldCBqc29uUmVxdWVzdDM6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiA9IHtcbiAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmksXG4gICAgcmVzcG9uc2VfdHlwZTogQXV0aG9yaXphdGlvblJlcXVlc3QuUkVTUE9OU0VfVFlQRV9UT0tFTixcbiAgICBzY29wZTogc2NvcGUsXG4gICAgc3RhdGU6IHVuZGVmaW5lZCxcbiAgICBleHRyYXM6IGV4dHJhc1xuICB9O1xuXG4gIGxldCByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCA9IG5ldyBBdXRob3JpemF0aW9uUmVxdWVzdChqc29uUmVxdWVzdCk7XG4gIGxldCByZXF1ZXN0MjogQXV0aG9yaXphdGlvblJlcXVlc3QgPSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QoanNvblJlcXVlc3QyKTtcblxuICBpdCgnQmFzaWMgQXV0aG9yaXphdGlvbiBSZXF1ZXN0IFRlc3RzJywgKCkgPT4ge1xuICAgIGV4cGVjdChyZXF1ZXN0KS5ub3QudG9CZU51bGwoKTtcbiAgICBleHBlY3QocmVxdWVzdC5yZXNwb25zZVR5cGUpLnRvQmUoQXV0aG9yaXphdGlvblJlcXVlc3QuUkVTUE9OU0VfVFlQRV9DT0RFKTtcbiAgICBleHBlY3QocmVxdWVzdC5jbGllbnRJZCkudG9CZShjbGllbnRJZCk7XG4gICAgZXhwZWN0KHJlcXVlc3QucmVkaXJlY3RVcmkpLnRvQmUocmVkaXJlY3RVcmkpO1xuICAgIGV4cGVjdChyZXF1ZXN0LnNjb3BlKS50b0JlKHNjb3BlKTtcbiAgICBleHBlY3QocmVxdWVzdC5zdGF0ZSkudG9CZShzdGF0ZSk7XG4gICAgZXhwZWN0KHJlcXVlc3QuZXh0cmFzKS50b0JlVHJ1dGh5KCk7XG4gICAgZXhwZWN0KHJlcXVlc3QuZXh0cmFzIVsna2V5J10pLnRvQmUoJ3ZhbHVlJyk7XG4gICAgZXhwZWN0KHJlcXVlc3QuZXh0cmFzKS50b0VxdWFsKGV4dHJhcyk7XG4gIH0pO1xuXG4gIGl0KCdUbyBKc29uKCkgYW5kIGZyb20gSnNvbigpIHNob3VsZCB3b3JrJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcXVlc3QudG9Kc29uKClcbiAgICBsZXQganNvbiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSk7XG4gICAgZXhwZWN0KGpzb24pLm5vdC50b0JlTnVsbCgpO1xuICAgIGxldCBuZXdSZXF1ZXN0ID0gbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0KGpzb24pO1xuICAgIGV4cGVjdChuZXdSZXF1ZXN0KS5ub3QudG9CZU51bGwoKTtcbiAgICBleHBlY3QobmV3UmVxdWVzdC5yZXNwb25zZVR5cGUpLnRvQmUoQXV0aG9yaXphdGlvblJlcXVlc3QuUkVTUE9OU0VfVFlQRV9DT0RFKTtcbiAgICBleHBlY3QobmV3UmVxdWVzdC5jbGllbnRJZCkudG9CZShjbGllbnRJZCk7XG4gICAgZXhwZWN0KG5ld1JlcXVlc3QucmVkaXJlY3RVcmkpLnRvQmUocmVkaXJlY3RVcmkpO1xuICAgIGV4cGVjdChuZXdSZXF1ZXN0LnNjb3BlKS50b0JlKHNjb3BlKTtcbiAgICBleHBlY3QobmV3UmVxdWVzdC5zdGF0ZSkudG9CZShzdGF0ZSk7XG4gICAgZXhwZWN0KG5ld1JlcXVlc3QuZXh0cmFzKS50b0JlVHJ1dGh5KCk7XG4gICAgZXhwZWN0KG5ld1JlcXVlc3QuZXh0cmFzIVsna2V5J10pLnRvQmUoJ3ZhbHVlJyk7XG4gICAgZXhwZWN0KG5ld1JlcXVlc3QuZXh0cmFzKS50b0VxdWFsKHJlcXVlc3QuZXh0cmFzKTtcbiAgICBleHBlY3QobmV3UmVxdWVzdC5pbnRlcm5hbCkudG9FcXVhbChyZXF1ZXN0LmludGVybmFsKTtcbiAgfSk7XG5cbiAgaXQoJ0V4cGVjdCBjcnlwdG9ncmFwaGljIG5ld1N0YXRlKCkgdG8gcG9wdWxhdGUgc3RhdGUnLCAoKSA9PiB7XG4gICAgZXhwZWN0KHJlcXVlc3QyLnN0YXRlKS5ub3QudG9CZU51bGwoKTtcbiAgfSk7XG5cbiAgaXQoJ1N1cHBvcnQgcmVzcG9uc2VfdHlwZSBUT0tFTicsICgpID0+IHtcbiAgICBsZXQgcmVxdWVzdDM6IEF1dGhvcml6YXRpb25SZXF1ZXN0ID0gbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0KGpzb25SZXF1ZXN0Myk7XG4gICAgZXhwZWN0KHJlcXVlc3QzLnJlc3BvbnNlVHlwZSkudG9CZShBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX1RPS0VOKTtcbiAgfSk7XG59KTtcbiJdfQ==