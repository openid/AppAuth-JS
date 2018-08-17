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
var errors_1 = require("./errors");
describe('Errors Tests', function () {
    var message = 'Something bad happened';
    it('Initialization of an error message should work.', function () {
        var error = new errors_1.AppAuthError(message);
        expect(error).toBeTruthy();
        expect(error.message).toBe(message);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZXJyb3JzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFFSCxtQ0FBc0M7QUFFdEMsUUFBUSxDQUFDLGNBQWMsRUFBRTtJQUN2QixJQUFNLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztJQUV6QyxFQUFFLENBQUMsaURBQWlELEVBQUU7UUFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxxQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcclxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXHJcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXHJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xyXG5cclxuZGVzY3JpYmUoJ0Vycm9ycyBUZXN0cycsICgpID0+IHtcclxuICBjb25zdCBtZXNzYWdlID0gJ1NvbWV0aGluZyBiYWQgaGFwcGVuZWQnO1xyXG5cclxuICBpdCgnSW5pdGlhbGl6YXRpb24gb2YgYW4gZXJyb3IgbWVzc2FnZSBzaG91bGQgd29yay4nLCAoKSA9PiB7XHJcbiAgICBsZXQgZXJyb3IgPSBuZXcgQXBwQXV0aEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgZXhwZWN0KGVycm9yKS50b0JlVHJ1dGh5KCk7XHJcbiAgICBleHBlY3QoZXJyb3IubWVzc2FnZSkudG9CZShtZXNzYWdlKTtcclxuICB9KTtcclxufSk7XHJcbiJdfQ==