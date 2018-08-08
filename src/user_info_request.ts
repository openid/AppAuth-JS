import {StringMap} from './types';

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
export class UserInfoRequest {
  constructor(public accessToken?: string, public extras?: StringMap) {}

  /**
   * Serializes a UserInfoRequest to a JavaScript object.
   */
  toJson(): UserInfoRequestJson {
    return {access_token: this.accessToken, extras: this.extras};
  }

  toStringMap(): StringMap {
    let map: StringMap = {};

    // copy over extras
    if (this.extras) {
      for (let extra in this.extras) {
        if (this.extras.hasOwnProperty(extra) && !map.hasOwnProperty(extra)) {
          // check before inserting to requestMap
          map[extra] = this.extras[extra];
        }
      }
    }

    return map;
  }

  static fromJson(input: UserInfoRequestJson): UserInfoRequest {
    return new UserInfoRequest(input.access_token, input.extras);
  }

  setExtrasField(key: string, value: string) {
    if (this.extras) {
      this.extras[key] = value;
    }
  }
}