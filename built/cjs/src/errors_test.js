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
const errors_1 = require("./errors");
describe('Errors Tests', () => {
    const message = 'Something bad happened';
    it('Initialization of an error message should work.', () => {
        let error = new errors_1.AppAuthError(message);
        expect(error).toBeTruthy();
        expect(error.message).toBe(message);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXJyb3JzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFFSCxxQ0FBc0M7QUFFdEMsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7SUFDNUIsTUFBTSxPQUFPLEdBQUcsd0JBQXdCLENBQUM7SUFFekMsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLEdBQUcsRUFBRTtRQUN6RCxJQUFJLEtBQUssR0FBRyxJQUFJLHFCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBcHBBdXRoRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuZGVzY3JpYmUoJ0Vycm9ycyBUZXN0cycsICgpID0+IHtcbiAgY29uc3QgbWVzc2FnZSA9ICdTb21ldGhpbmcgYmFkIGhhcHBlbmVkJztcblxuICBpdCgnSW5pdGlhbGl6YXRpb24gb2YgYW4gZXJyb3IgbWVzc2FnZSBzaG91bGQgd29yay4nLCAoKSA9PiB7XG4gICAgbGV0IGVycm9yID0gbmV3IEFwcEF1dGhFcnJvcihtZXNzYWdlKTtcbiAgICBleHBlY3QoZXJyb3IpLnRvQmVUcnV0aHkoKTtcbiAgICBleHBlY3QoZXJyb3IubWVzc2FnZSkudG9CZShtZXNzYWdlKTtcbiAgfSk7XG59KTtcbiJdfQ==