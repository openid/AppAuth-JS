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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmxhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBRUgsNERBQTREO0FBQy9DLFFBQUEsS0FBSyxHQUNkO0lBQ0UseUJBQXlCO0lBQ3pCLE1BQU0sRUFBRSxJQUFJO0lBQ1osMkJBQTJCO0lBQzNCLFVBQVUsRUFBRSxLQUFLO0NBQ2xCLENBQUE7QUFFTCwyREFBMkQ7QUFDM0QsU0FDQSxPQUFPLENBQUMsSUFBd0IsRUFBRSxLQUFjO0lBQzlDLGFBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDdEIsQ0FBQztBQUhELDBCQUdDO0FBRWEsUUFBQSxNQUFNLEdBQWdCLGFBQUssU0FBbkIsUUFBQSxVQUFVLEdBQUksYUFBSyxZQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIEdsb2JhbCBmbGFncyB0aGF0IGNvbnRyb2wgdGhlIGJlaGF2aW9yIG9mIEFwcCBBdXRoIEpTLiAqL1xuZXhwb3J0IGNvbnN0IEZsYWdzID1cbiAgICB7XG4gICAgICAvKiBMb2dnaW5nIHR1cm5lZCBvbiA/ICovXG4gICAgICBJU19MT0c6IHRydWUsXG4gICAgICAvKiBQcm9maWxpbmcgdHVybmVkIG9uID8gKi9cbiAgICAgIElTX1BST0ZJTEU6IGZhbHNlLFxuICAgIH1cblxuLyoqIFNldCBhIHZhbHVlIGZvciB0aGUgc3BlY2lmaWVkIGdsb2JhbCBjb250cm9sIGZsYWdzLiAgKi9cbmV4cG9ydCBmdW5jdGlvblxuc2V0RmxhZyhmbGFnOiBrZXlvZiB0eXBlb2YgRmxhZ3MsIHZhbHVlOiBib29sZWFuKSB7XG4gIEZsYWdzW2ZsYWddID0gdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCB7SVNfTE9HLCBJU19QUk9GSUxFfSA9IEZsYWdzO1xuIl19