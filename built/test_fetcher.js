"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright 2018 David Waite
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
/**
- * Should be used only in the context of testing. Just uses the underlying
- * Promise to mock the behavior of the Requestor.
-
*/
function testFetchWithResult(result) {
    return {
        fetch: function (input, init) {
            return Promise.resolve(new Response(JSON.stringify(result)));
        }
    };
}
exports.testFetchWithResult = testFetchWithResult;
function testFetchWithError(error) {
    return {
        fetch: function (input, init) {
            return Promise.reject(error);
        }
    };
}
exports.testFetchWithError = testFetchWithError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9mZXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Rlc3RfZmV0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNIOzs7O0VBSUU7QUFDRiw2QkFBb0MsTUFBVztJQUM3QyxNQUFNLENBQUM7UUFDTCxLQUFLLEVBQUUsVUFBQyxLQUFrQixFQUFFLElBQWtCO1lBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFXLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQztBQU5ELGtEQU1DO0FBRUQsNEJBQW1DLEtBQVU7SUFDM0MsTUFBTSxDQUFDO1FBQ0wsS0FBSyxFQUFFLFVBQUMsS0FBa0IsRUFBRSxJQUFrQjtZQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVyxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUFORCxnREFNQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBEYXZpZCBXYWl0ZVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuLyoqXG4tICogU2hvdWxkIGJlIHVzZWQgb25seSBpbiB0aGUgY29udGV4dCBvZiB0ZXN0aW5nLiBKdXN0IHVzZXMgdGhlIHVuZGVybHlpbmdcbi0gKiBQcm9taXNlIHRvIG1vY2sgdGhlIGJlaGF2aW9yIG9mIHRoZSBSZXF1ZXN0b3IuXG4tXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHRlc3RGZXRjaFdpdGhSZXN1bHQocmVzdWx0OiBhbnkpOiBHbG9iYWxGZXRjaCB7XG4gIHJldHVybiB7XG4gICAgZmV0Y2g6IChpbnB1dDogUmVxdWVzdEluZm8sIGluaXQ/OiBSZXF1ZXN0SW5pdCkgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZTxSZXNwb25zZT4obmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RGZXRjaFdpdGhFcnJvcihlcnJvcjogYW55KTogR2xvYmFsRmV0Y2gge1xuICByZXR1cm4ge1xuICAgIGZldGNoOiAoaW5wdXQ6IFJlcXVlc3RJbmZvLCBpbml0PzogUmVxdWVzdEluaXQpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdDxSZXNwb25zZT4oZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19