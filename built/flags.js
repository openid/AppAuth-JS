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
exports.IS_PROFILE = exports.IS_LOG = exports.setFlag = exports.Flags = void 0;
/* Global flags that control the behavior of App Auth JS. */
exports.Flags = {
    /* Logging turned on ? */
    IS_LOG: true,
    /* Profiling turned on ? */
    IS_PROFILE: false,
};
/** Set a value for the specified global control flags.  */
function setFlag(flag, value) {
    exports.Flags[flag] = value;
}
exports.setFlag = setFlag;
exports.IS_LOG = exports.Flags.IS_LOG, exports.IS_PROFILE = exports.Flags.IS_PROFILE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmxhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBRUgsNERBQTREO0FBQy9DLFFBQUEsS0FBSyxHQUNkO0lBQ0UseUJBQXlCO0lBQ3pCLE1BQU0sRUFBRSxJQUFJO0lBQ1osMkJBQTJCO0lBQzNCLFVBQVUsRUFBRSxLQUFLO0NBQ2xCLENBQUE7QUFFTCwyREFBMkQ7QUFDM0QsU0FBZ0IsT0FBTyxDQUFDLElBQXdCLEVBQUUsS0FBYztJQUM5RCxhQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ3RCLENBQUM7QUFGRCwwQkFFQztBQUVhLFFBQUEsTUFBTSxHQUFnQixhQUFLLFNBQW5CLFFBQUEsVUFBVSxHQUFJLGFBQUssWUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKiBHbG9iYWwgZmxhZ3MgdGhhdCBjb250cm9sIHRoZSBiZWhhdmlvciBvZiBBcHAgQXV0aCBKUy4gKi9cbmV4cG9ydCBjb25zdCBGbGFncyA9XG4gICAge1xuICAgICAgLyogTG9nZ2luZyB0dXJuZWQgb24gPyAqL1xuICAgICAgSVNfTE9HOiB0cnVlLFxuICAgICAgLyogUHJvZmlsaW5nIHR1cm5lZCBvbiA/ICovXG4gICAgICBJU19QUk9GSUxFOiBmYWxzZSxcbiAgICB9XG5cbi8qKiBTZXQgYSB2YWx1ZSBmb3IgdGhlIHNwZWNpZmllZCBnbG9iYWwgY29udHJvbCBmbGFncy4gICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmxhZyhmbGFnOiBrZXlvZiB0eXBlb2YgRmxhZ3MsIHZhbHVlOiBib29sZWFuKSB7XG4gIEZsYWdzW2ZsYWddID0gdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCB7SVNfTE9HLCBJU19QUk9GSUxFfSA9IEZsYWdzO1xuIl19