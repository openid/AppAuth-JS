import { AuthorizationManagementResponse } from './authorization_management_response';
/**
 * Represents the EndSessionResponse as a JSON object.
 */
export interface EndSessionResponseJson {
    state: string;
}
/**
 * Represents the EndSession Response type.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
export declare class EndSessionResponse extends AuthorizationManagementResponse {
    state: string;
    constructor(response: EndSessionResponseJson);
    toJson(): EndSessionResponseJson;
}
