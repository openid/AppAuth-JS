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
export function testFetchWithResult(result: any): GlobalFetch {
  return {
    fetch: (input: RequestInfo, init?: RequestInit) => {
      return Promise.resolve<Response>(new Response(JSON.stringify(result)));
    }
  }
}

export function testFetchWithError(error: any): GlobalFetch {
  return {
    fetch: (input: RequestInfo, init?: RequestInit) => {
      return Promise.reject<Response>(error);
    }
  }
}
