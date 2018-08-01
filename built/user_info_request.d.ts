import { StringMap } from './types';
/**
 * Represents the User Info Request as JSON.
 */
export interface UserInfoRequestJson {
    access_token: string;
    schema: string;
    extras?: StringMap;
}
/**
 * Represents an User Info request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.3 (TODO: Have to update the section)
 */
export declare class UserInfoRequest {
    accessToken: string;
    schema: string;
    extras?: StringMap | undefined;
    constructor(accessToken: string, schema: string, extras?: StringMap | undefined);
    /**
     * Serializes a UserInfoRequest to a JavaScript object.
     */
    toJson(): UserInfoRequestJson;
    toStringMap(): StringMap;
    static fromJson(input: UserInfoRequestJson): UserInfoRequest;
    setExtrasField(key: string, value: string): void;
}
