/**
 * Represents the UserInfoResponse as a JSON Object.
 */
export interface UserInfoResponseJson {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    preferred_username: string;
    email: string;
    picture: string;
}
/**
 * Represents the possible error codes from the userInfo endpoint.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoError
 */
export declare type UserInfoErrorType = 'invalid_token';
/**
 * Represents the UserInfoError as a JSON Object.
 */
export interface UserInfoErrorJson {
    error: UserInfoErrorType;
    error_description?: string;
}
/**
 * Represents the UserInfo Response type.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponse
 *
 * TODO: UserInfo response vlidation as of
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponseValidation
 */
export declare class UserInfoResponse {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    preferred_username: string;
    email: string;
    picture: string;
    constructor(sub: string, name: string, given_name: string, family_name: string, preferred_username: string, email: string, picture: string);
    toJson(): UserInfoResponseJson;
    static fromJson(input: UserInfoResponseJson): UserInfoResponse;
}
/**
 * Represents the UserInfo Error type.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoError
 */
export declare class UserInfoError {
    readonly error: UserInfoErrorType;
    readonly errorDescription?: string | undefined;
    constructor(error: UserInfoErrorType, errorDescription?: string | undefined);
    toJson(): UserInfoErrorJson;
    static fromJson(input: UserInfoErrorJson): UserInfoError;
}
