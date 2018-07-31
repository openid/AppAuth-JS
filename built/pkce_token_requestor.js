"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pkce_code_verifier_1 = require("./pkce_code_verifier");
var redirect_based_handler_1 = require("./redirect_based_handler");
var storage_1 = require("./storage");
var token_request_handler_1 = require("./token_request_handler");
var types_1 = require("./types");
var xhr_1 = require("./xhr");
var PKCETokenRequestHandler = /** @class */ (function () {
    function PKCETokenRequestHandler(authorizationHandler, configuration, storageBackend) {
        if (storageBackend === void 0) { storageBackend = new storage_1.LocalStorageBackend(); }
        this.verifier = new pkce_code_verifier_1.CodeVerifier();
        this.authorizationHandler = new redirect_based_handler_1.RedirectRequestHandler();
        this.tokenHandler = new token_request_handler_1.BaseTokenRequestHandler(new xhr_1.JQueryRequestor());
        this.configuration = configuration;
        this.storageBackend = storageBackend;
    }
    PKCETokenRequestHandler.prototype.performPKCEAuthorizationCodeRequest = function (configuration, request) {
        request.setExtrasField('code_verifier', this.verifier.verifier);
        this.authorizationHandler.performAuthorizationRequest(configuration, request);
    };
    PKCETokenRequestHandler.prototype.performPKCEAuthorizationTokenRequest = function (configuration, request) {
        var _this = this;
        this.storageBackend.getItem(types_1.AUTHORIZATION_RESPONSE_HANDLE_KEY).then(function (result) {
            var authResponse = JSON.parse(result);
            request.setExtrasField('code_challenge', _this.verifier.challenge);
            request.setExtrasField('code_challenge_method', _this.verifier.method);
            _this.tokenHandler.performTokenRequest(_this.configuration, request)
                .then(function (tokenResponseJson) {
                _this.storageBackend.removeItem(types_1.AUTHORIZATION_RESPONSE_HANDLE_KEY).then(function () {
                    _this.storageBackend.setItem(types_1.AUTHORIZATION_RESPONSE_HANDLE_KEY, JSON.stringify(tokenResponseJson));
                });
            })
                .catch(function (err) {
                console.log('error ' + err.message);
            });
        });
    };
    return PKCETokenRequestHandler;
}());
exports.PKCETokenRequestHandler = PKCETokenRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGtjZV90b2tlbl9yZXF1ZXN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGtjZV90b2tlbl9yZXF1ZXN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSwyREFBa0Q7QUFDbEQsbUVBQWdFO0FBQ2hFLHFDQUE4RDtBQUU5RCxpRUFBcUY7QUFDckYsaUNBQTBEO0FBQzFELDZCQUFzQztBQUV0QztJQU9FLGlDQUNJLG9CQUFpRCxFQUNqRCxhQUFnRCxFQUNoRCxjQUEwRDtRQUExRCwrQkFBQSxFQUFBLHFCQUFxQyw2QkFBbUIsRUFBRTtRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUNBQVksRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLCtDQUFzQixFQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLCtDQUF1QixDQUFDLElBQUkscUJBQWUsRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDdkMsQ0FBQztJQUVELHFFQUFtQyxHQUFuQyxVQUNJLGFBQWdELEVBQ2hELE9BQTZCO1FBQy9CLE9BQU8sQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLDJCQUEyQixDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsc0VBQW9DLEdBQXBDLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBcUI7UUFGekIsaUJBb0JDO1FBakJDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLHlDQUFpQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUN4RSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU8sQ0FBQyxDQUFDO1lBRXZDLE9BQU8sQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRSxPQUFPLENBQUMsY0FBYyxDQUFDLHVCQUF1QixFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFdEUsS0FBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztpQkFDN0QsSUFBSSxDQUFDLFVBQUEsaUJBQWlCO2dCQUNyQixLQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyx5Q0FBaUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDckUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQ3ZCLHlDQUFpQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQyxHQUFHO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQTlDRCxJQThDQztBQTlDWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0fSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XG5pbXBvcnQge0NvZGVWZXJpZmllcn0gZnJvbSAnLi9wa2NlX2NvZGVfdmVyaWZpZXInO1xuaW1wb3J0IHtSZWRpcmVjdFJlcXVlc3RIYW5kbGVyfSBmcm9tICcuL3JlZGlyZWN0X2Jhc2VkX2hhbmRsZXInO1xuaW1wb3J0IHtMb2NhbFN0b3JhZ2VCYWNrZW5kLCBTdG9yYWdlQmFja2VuZH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7VG9rZW5SZXF1ZXN0fSBmcm9tICcuL3Rva2VuX3JlcXVlc3QnO1xuaW1wb3J0IHtCYXNlVG9rZW5SZXF1ZXN0SGFuZGxlciwgVG9rZW5SZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi90b2tlbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtBVVRIT1JJWkFUSU9OX1JFU1BPTlNFX0hBTkRMRV9LRVl9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtKUXVlcnlSZXF1ZXN0b3J9IGZyb20gJy4veGhyJztcblxuZXhwb3J0IGNsYXNzIFBLQ0VUb2tlblJlcXVlc3RIYW5kbGVyIHtcbiAgdmVyaWZpZXI6IENvZGVWZXJpZmllcjtcbiAgYXV0aG9yaXphdGlvbkhhbmRsZXI6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcjtcbiAgdG9rZW5IYW5kbGVyOiBUb2tlblJlcXVlc3RIYW5kbGVyO1xuICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb247XG4gIHN0b3JhZ2VCYWNrZW5kOiBTdG9yYWdlQmFja2VuZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGF1dGhvcml6YXRpb25IYW5kbGVyOiBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICBzdG9yYWdlQmFja2VuZDogU3RvcmFnZUJhY2tlbmQgPSBuZXcgTG9jYWxTdG9yYWdlQmFja2VuZCgpKSB7XG4gICAgdGhpcy52ZXJpZmllciA9IG5ldyBDb2RlVmVyaWZpZXIoKTtcbiAgICB0aGlzLmF1dGhvcml6YXRpb25IYW5kbGVyID0gbmV3IFJlZGlyZWN0UmVxdWVzdEhhbmRsZXIoKTtcbiAgICB0aGlzLnRva2VuSGFuZGxlciA9IG5ldyBCYXNlVG9rZW5SZXF1ZXN0SGFuZGxlcihuZXcgSlF1ZXJ5UmVxdWVzdG9yKCkpO1xuICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG4gICAgdGhpcy5zdG9yYWdlQmFja2VuZCA9IHN0b3JhZ2VCYWNrZW5kO1xuICB9XG5cbiAgcGVyZm9ybVBLQ0VBdXRob3JpemF0aW9uQ29kZVJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCkge1xuICAgIHJlcXVlc3Quc2V0RXh0cmFzRmllbGQoJ2NvZGVfdmVyaWZpZXInLCB0aGlzLnZlcmlmaWVyLnZlcmlmaWVyKTtcbiAgICB0aGlzLmF1dGhvcml6YXRpb25IYW5kbGVyLnBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgfVxuXG4gIHBlcmZvcm1QS0NFQXV0aG9yaXphdGlvblRva2VuUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IFRva2VuUmVxdWVzdCkge1xuICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuZ2V0SXRlbShBVVRIT1JJWkFUSU9OX1JFU1BPTlNFX0hBTkRMRV9LRVkpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHZhciBhdXRoUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3VsdCEpO1xuXG4gICAgICByZXF1ZXN0LnNldEV4dHJhc0ZpZWxkKCdjb2RlX2NoYWxsZW5nZScsIHRoaXMudmVyaWZpZXIuY2hhbGxlbmdlKTtcbiAgICAgIHJlcXVlc3Quc2V0RXh0cmFzRmllbGQoJ2NvZGVfY2hhbGxlbmdlX21ldGhvZCcsIHRoaXMudmVyaWZpZXIubWV0aG9kKTtcblxuICAgICAgdGhpcy50b2tlbkhhbmRsZXIucGVyZm9ybVRva2VuUmVxdWVzdCh0aGlzLmNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpXG4gICAgICAgICAgLnRoZW4odG9rZW5SZXNwb25zZUpzb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKEFVVEhPUklaQVRJT05fUkVTUE9OU0VfSEFORExFX0tFWSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShcbiAgICAgICAgICAgICAgICAgIEFVVEhPUklaQVRJT05fUkVTUE9OU0VfSEFORExFX0tFWSwgSlNPTi5zdHJpbmdpZnkodG9rZW5SZXNwb25zZUpzb24pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59Il19