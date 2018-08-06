"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var query_string_utils_1 = require("./query_string_utils");
var storage_1 = require("./storage");
var token_response_1 = require("./token_response");
var types_1 = require("./types");
var user_info_response_1 = require("./user_info_response");
var xhr_1 = require("./xhr");
/**
 * The default user info request handler.
 */
var BaseUserInfoRequestHandler = /** @class */ (function () {
    function BaseUserInfoRequestHandler(storageBackend) {
        if (storageBackend === void 0) { storageBackend = new storage_1.LocalStorageBackend(); }
        this.storageBackend = storageBackend;
        this.requestor = new xhr_1.JQueryRequestor();
        this.utils = new query_string_utils_1.BasicQueryStringUtils();
        this.storageBackend = storageBackend;
    }
    BaseUserInfoRequestHandler.prototype.isUserInfoResponse = function (response) {
        return response.error === undefined;
    };
    BaseUserInfoRequestHandler.prototype.performUserInfoRequest = function (configuration, request) {
        var _this = this;
        return this.storageBackend.getItem(types_1.AUTHORIZATION_RESPONSE_HANDLE_KEY).then(function (result) {
            var tokenResponseJson = JSON.parse(result);
            var tokenResponse = token_response_1.TokenResponse.fromJson(tokenResponseJson);
            var userInfoResponse = _this.requestor.xhr({
                url: configuration.userInfoEndpoint,
                method: 'GET',
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + tokenResponse.accessToken,
                    'Access-Control-Allow-Origin': '*'
                }
            });
            return userInfoResponse.then(function (response) {
                if (_this.isUserInfoResponse(response)) {
                    return user_info_response_1.UserInfoResponse.fromJson(response);
                }
                else {
                    return Promise.reject(new errors_1.AppAuthError(response.error, user_info_response_1.UserInfoError.fromJson(response)));
                }
            });
        });
    };
    return BaseUserInfoRequestHandler;
}());
exports.BaseUserInfoRequestHandler = BaseUserInfoRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3RfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyX2luZm9fcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQXNDO0FBRXRDLDJEQUE2RTtBQUM3RSxxQ0FBOEQ7QUFDOUQsbURBQStDO0FBQy9DLGlDQUEwRDtBQUUxRCwyREFBOEc7QUFDOUcsNkJBQWlEO0FBZWpEOztHQUVHO0FBQ0g7SUFJRSxvQ0FBNEIsY0FBMEQ7UUFBMUQsK0JBQUEsRUFBQSxxQkFBcUMsNkJBQW1CLEVBQUU7UUFBMUQsbUJBQWMsR0FBZCxjQUFjLENBQTRDO1FBQ3BGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBZSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDBDQUFxQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVPLHVEQUFrQixHQUExQixVQUEyQixRQUNpQjtRQUMxQyxPQUFRLFFBQThCLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsMkRBQXNCLEdBQXRCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBeUI7UUFGN0IsaUJBMEJDO1FBdkJDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMseUNBQWlDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQy9FLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFPLENBQUMsQ0FBQztZQUM1QyxJQUFJLGFBQWEsR0FBRyw4QkFBYSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRTlELElBQUksZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQXlDO2dCQUNoRixHQUFHLEVBQUUsYUFBYSxDQUFDLGdCQUFnQjtnQkFDbkMsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLE9BQU8sRUFBRTtvQkFDUCxlQUFlLEVBQUUsU0FBUyxHQUFHLGFBQWEsQ0FBQyxXQUFXO29CQUN0RCw2QkFBNkIsRUFBRSxHQUFHO2lCQUNuQzthQUNGLENBQUMsQ0FBQztZQUVILE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDbkMsSUFBSSxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3JDLE9BQU8scUNBQWdCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM1QztxQkFBTTtvQkFDTCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLElBQUkscUJBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLGtDQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDekU7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGlDQUFDO0FBQUQsQ0FBQyxBQTFDRCxJQTBDQztBQTFDWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge0xvY2FsU3RvcmFnZUJhY2tlbmQsIFN0b3JhZ2VCYWNrZW5kfSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHtUb2tlblJlc3BvbnNlfSBmcm9tICcuL3Rva2VuX3Jlc3BvbnNlJztcbmltcG9ydCB7QVVUSE9SSVpBVElPTl9SRVNQT05TRV9IQU5ETEVfS0VZfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7VXNlckluZm9SZXF1ZXN0fSBmcm9tICcuL3VzZXJfaW5mb19yZXF1ZXN0JztcbmltcG9ydCB7VXNlckluZm9FcnJvciwgVXNlckluZm9FcnJvckpzb24sIFVzZXJJbmZvUmVzcG9uc2UsIFVzZXJJbmZvUmVzcG9uc2VKc29ufSBmcm9tICcuL3VzZXJfaW5mb19yZXNwb25zZSc7XG5pbXBvcnQge0pRdWVyeVJlcXVlc3RvciwgUmVxdWVzdG9yfSBmcm9tICcuL3hocic7XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgaW50ZXJmYWNlIHdoaWNoIGlzIGNhcGFibGUgb2YgaGFuZGxpbmcgYW4gdXNlciBpbmZvIHJlcXVlc3RcbiAqIHVzaW5nIHZhcmlvdXMgbWV0aG9kcyAoaWZyYW1lIC8gcG9wdXAgLyBkaWZmZXJlbnQgcHJvY2VzcyBldGMuKS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb1JlcXVlc3RIYW5kbGVyIHtcbiAgLyoqXG4gICAqIE1ha2VzIGFuIFVzZXJJbmZvIHJlcXVlc3QuXG4gICAqL1xuICBwZXJmb3JtVXNlckluZm9SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdD86IFVzZXJJbmZvUmVxdWVzdCk6IFByb21pc2U8VXNlckluZm9SZXNwb25zZT47XG59XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgdXNlciBpbmZvIHJlcXVlc3QgaGFuZGxlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VVc2VySW5mb1JlcXVlc3RIYW5kbGVyIGltcGxlbWVudHMgVXNlckluZm9SZXF1ZXN0SGFuZGxlciB7XG4gIHB1YmxpYyByZWFkb25seSByZXF1ZXN0b3I6IFJlcXVlc3RvcjtcbiAgcHVibGljIHJlYWRvbmx5IHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzXG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHN0b3JhZ2VCYWNrZW5kOiBTdG9yYWdlQmFja2VuZCA9IG5ldyBMb2NhbFN0b3JhZ2VCYWNrZW5kKCkpIHtcbiAgICB0aGlzLnJlcXVlc3RvciA9IG5ldyBKUXVlcnlSZXF1ZXN0b3IoKTtcbiAgICB0aGlzLnV0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpO1xuICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQgPSBzdG9yYWdlQmFja2VuZDtcbiAgfVxuXG4gIHByaXZhdGUgaXNVc2VySW5mb1Jlc3BvbnNlKHJlc3BvbnNlOiBVc2VySW5mb1Jlc3BvbnNlSnNvbnxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlckluZm9FcnJvckpzb24pOiByZXNwb25zZSBpcyBVc2VySW5mb1Jlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIChyZXNwb25zZSBhcyBVc2VySW5mb0Vycm9ySnNvbikuZXJyb3IgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHBlcmZvcm1Vc2VySW5mb1JlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0PzogVXNlckluZm9SZXF1ZXN0KTogUHJvbWlzZTxVc2VySW5mb1Jlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZUJhY2tlbmQuZ2V0SXRlbShBVVRIT1JJWkFUSU9OX1JFU1BPTlNFX0hBTkRMRV9LRVkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHZhciB0b2tlblJlc3BvbnNlSnNvbiA9IEpTT04ucGFyc2UocmVzdWx0ISk7XG4gICAgICB2YXIgdG9rZW5SZXNwb25zZSA9IFRva2VuUmVzcG9uc2UuZnJvbUpzb24odG9rZW5SZXNwb25zZUpzb24pO1xuXG4gICAgICBsZXQgdXNlckluZm9SZXNwb25zZSA9IHRoaXMucmVxdWVzdG9yLnhocjxVc2VySW5mb1Jlc3BvbnNlSnNvbnxVc2VySW5mb0Vycm9ySnNvbj4oe1xuICAgICAgICB1cmw6IGNvbmZpZ3VyYXRpb24udXNlckluZm9FbmRwb2ludCxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW5SZXNwb25zZS5hY2Nlc3NUb2tlbixcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdXNlckluZm9SZXNwb25zZS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNVc2VySW5mb1Jlc3BvbnNlKHJlc3BvbnNlKSkge1xuICAgICAgICAgIHJldHVybiBVc2VySW5mb1Jlc3BvbnNlLmZyb21Kc29uKHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Q8VXNlckluZm9SZXNwb25zZT4oXG4gICAgICAgICAgICAgIG5ldyBBcHBBdXRoRXJyb3IocmVzcG9uc2UuZXJyb3IsIFVzZXJJbmZvRXJyb3IuZnJvbUpzb24ocmVzcG9uc2UpKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=