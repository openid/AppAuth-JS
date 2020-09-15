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
var authorization_request_handler_1 = require("./authorization_request_handler");
describe('Tests for the Authorization Request handler', function () {
    describe('Basic protocol tests', function () {
        it('Basic authorization flow tests', function (done) {
            var notifier = new authorization_request_handler_1.AuthorizationNotifier();
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXJfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlcl90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsaUZBQXNFO0FBRXRFLFFBQVEsQ0FBQyw2Q0FBNkMsRUFBRTtJQUN0RCxRQUFRLENBQUMsc0JBQXNCLEVBQUU7UUFDL0IsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLFVBQUMsSUFBWTtZQUNoRCxJQUFJLFFBQVEsR0FBRyxJQUFJLHFEQUFxQixFQUFFLENBQUM7WUFDM0MsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7QXV0aG9yaXphdGlvbk5vdGlmaWVyfSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdF9oYW5kbGVyJztcclxuXHJcbmRlc2NyaWJlKCdUZXN0cyBmb3IgdGhlIEF1dGhvcml6YXRpb24gUmVxdWVzdCBoYW5kbGVyJywgKCkgPT4ge1xyXG4gIGRlc2NyaWJlKCdCYXNpYyBwcm90b2NvbCB0ZXN0cycsICgpID0+IHtcclxuICAgIGl0KCdCYXNpYyBhdXRob3JpemF0aW9uIGZsb3cgdGVzdHMnLCAoZG9uZTogRG9uZUZuKSA9PiB7XHJcbiAgICAgIGxldCBub3RpZmllciA9IG5ldyBBdXRob3JpemF0aW9uTm90aWZpZXIoKTtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXX0=