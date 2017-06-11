import { LocationLike, StringMap } from './types';
/**
 * Query String Utilities.
 */
export interface QueryStringUtils {
    stringify(input: StringMap): string;
    parse(query: LocationLike, useHash?: boolean): StringMap;
    parseQueryString(query: string): StringMap;
}
export declare class BasicQueryStringUtils implements QueryStringUtils {
    parse(input: LocationLike, useHash?: boolean): StringMap;
    parseQueryString(query: string): StringMap;
    stringify(input: StringMap): string;
}
