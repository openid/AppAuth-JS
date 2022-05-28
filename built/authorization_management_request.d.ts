import { StringMap } from './types';
export declare abstract class AuthorizationManagementRequest {
    abstract state: string;
    abstract toJson(): Promise<object>;
    abstract toRequestMap(): StringMap;
}
