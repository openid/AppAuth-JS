import { StringMap } from './types';
/**
 * Represents the User Info Request as JSON.
 */
export interface UserInfoRequestJson {
    access_token?: string;
    extras?: StringMap;
}
/**
 * Represents an User Info request.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoRequest
 */
export declare class UserInfoRequest {
    accessToken?: string | undefined;
    extras?: StringMap | undefined;
    constructor(accessToken?: string | undefined, extras?: StringMap | undefined);
    /**
     * Serializes a UserInfoRequest to a JavaScript object.
     */
    toJson(): UserInfoRequestJson;
    toStringMap(): StringMap;
    static fromJson(input: UserInfoRequestJson): UserInfoRequest;
    setExtrasField(key: string, value: string): void;
}
