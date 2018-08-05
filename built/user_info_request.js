"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an User Info request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.3 (TODO: Have to update the section)
 */
var UserInfoRequest = /** @class */ (function () {
    function UserInfoRequest(schema, accessToken, extras) {
        this.schema = schema;
        this.accessToken = accessToken;
        this.extras = extras;
    }
    /**
     * Serializes a UserInfoRequest to a JavaScript object.
     */
    UserInfoRequest.prototype.toJson = function () {
        return { access_token: this.accessToken, schema: this.schema, extras: this.extras };
    };
    UserInfoRequest.prototype.toStringMap = function () {
        var map = {};
        // copy over extras
        if (this.extras) {
            for (var extra in this.extras) {
                if (this.extras.hasOwnProperty(extra) && !map.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    map[extra] = this.extras[extra];
                }
            }
        }
        return map;
    };
    UserInfoRequest.fromJson = function (input) {
        return new UserInfoRequest(input.schema, input.access_token, input.extras);
    };
    UserInfoRequest.prototype.setExtrasField = function (key, value) {
        if (this.extras) {
            this.extras[key] = value;
        }
    };
    return UserInfoRequest;
}());
exports.UserInfoRequest = UserInfoRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcl9pbmZvX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQTs7OztHQUlHO0FBQ0g7SUFDRSx5QkFBbUIsTUFBYyxFQUFTLFdBQW9CLEVBQVMsTUFBa0I7UUFBdEUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFN0Y7O09BRUc7SUFDSCxnQ0FBTSxHQUFOO1FBQ0UsT0FBTyxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLEdBQUcsR0FBYyxFQUFFLENBQUM7UUFFeEIsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ25FLHVDQUF1QztvQkFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7U0FDRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLHdCQUFRLEdBQWYsVUFBZ0IsS0FBMEI7UUFDeEMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCx3Q0FBYyxHQUFkLFVBQWUsR0FBVyxFQUFFLEtBQWE7UUFDdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFVzZXIgSW5mbyBSZXF1ZXN0IGFzIEpTT04uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9SZXF1ZXN0SnNvbiB7XG4gIGFjY2Vzc190b2tlbj86IHN0cmluZztcbiAgc2NoZW1hOiBzdHJpbmc7XG4gIGV4dHJhcz86IFN0cmluZ01hcDtcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gVXNlciBJbmZvIHJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMyAoVE9ETzogSGF2ZSB0byB1cGRhdGUgdGhlIHNlY3Rpb24pXG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VySW5mb1JlcXVlc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2NoZW1hOiBzdHJpbmcsIHB1YmxpYyBhY2Nlc3NUb2tlbj86IHN0cmluZywgcHVibGljIGV4dHJhcz86IFN0cmluZ01hcCkge31cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIFVzZXJJbmZvUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgKi9cbiAgdG9Kc29uKCk6IFVzZXJJbmZvUmVxdWVzdEpzb24ge1xuICAgIHJldHVybiB7YWNjZXNzX3Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuLCBzY2hlbWE6IHRoaXMuc2NoZW1hLCBleHRyYXM6IHRoaXMuZXh0cmFzfTtcbiAgfVxuXG4gIHRvU3RyaW5nTWFwKCk6IFN0cmluZ01hcCB7XG4gICAgbGV0IG1hcDogU3RyaW5nTWFwID0ge307XG5cbiAgICAvLyBjb3B5IG92ZXIgZXh0cmFzXG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XG4gICAgICBmb3IgKGxldCBleHRyYSBpbiB0aGlzLmV4dHJhcykge1xuICAgICAgICBpZiAodGhpcy5leHRyYXMuaGFzT3duUHJvcGVydHkoZXh0cmEpICYmICFtYXAuaGFzT3duUHJvcGVydHkoZXh0cmEpKSB7XG4gICAgICAgICAgLy8gY2hlY2sgYmVmb3JlIGluc2VydGluZyB0byByZXF1ZXN0TWFwXG4gICAgICAgICAgbWFwW2V4dHJhXSA9IHRoaXMuZXh0cmFzW2V4dHJhXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFVzZXJJbmZvUmVxdWVzdEpzb24pOiBVc2VySW5mb1JlcXVlc3Qge1xuICAgIHJldHVybiBuZXcgVXNlckluZm9SZXF1ZXN0KGlucHV0LnNjaGVtYSwgaW5wdXQuYWNjZXNzX3Rva2VuLCBpbnB1dC5leHRyYXMpO1xuICB9XG5cbiAgc2V0RXh0cmFzRmllbGQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcbiAgICAgIHRoaXMuZXh0cmFzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==