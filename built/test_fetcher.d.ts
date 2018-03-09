/**
- * Should be used only in the context of testing. Just uses the underlying
- * Promise to mock the behavior of the Requestor.
-
*/
export declare function testFetchWithResult(result: any): GlobalFetch;
export declare function testFetchWithError(error: any): GlobalFetch;
