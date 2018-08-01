"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an User Info request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.3 (TODO: Have to update the section)
 */
var UserInfoRequest = /** @class */ (function () {
    function UserInfoRequest(accessToken, schema, extras) {
        this.accessToken = accessToken;
        this.schema = schema;
        this.extras = extras;
    }
    /**
     * Serializes a UserInfoRequest to a JavaScript object.
     */
    UserInfoRequest.prototype.toJson = function () {
        return { access_token: this.accessToken, schema: this.schema, extras: this.extras };
    };
    UserInfoRequest.prototype.toStringMap = function () {
        var map = { access_token: this.accessToken, schema: this.schema };
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
        return new UserInfoRequest(input.access_token, input.schema, input.extras);
    };
    UserInfoRequest.prototype.setExtrasField = function (key, value) {
        if (this.extras) {
            this.extras[key] = value;
        }
    };
    return UserInfoRequest;
}());
exports.UserInfoRequest = UserInfoRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcl9pbmZvX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQTs7OztHQUlHO0FBQ0g7SUFDRSx5QkFBbUIsV0FBbUIsRUFBUyxNQUFjLEVBQVMsTUFBa0I7UUFBckUsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFNUY7O09BRUc7SUFDSCxnQ0FBTSxHQUFOO1FBQ0UsT0FBTyxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLEdBQUcsR0FBYyxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUM7UUFFM0UsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ25FLHVDQUF1QztvQkFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7U0FDRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLHdCQUFRLEdBQWYsVUFBZ0IsS0FBMEI7UUFDeEMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCx3Q0FBYyxHQUFkLFVBQWUsR0FBVyxFQUFFLEtBQWE7UUFDdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFVzZXIgSW5mbyBSZXF1ZXN0IGFzIEpTT04uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckluZm9SZXF1ZXN0SnNvbiB7XG4gIGFjY2Vzc190b2tlbjogc3RyaW5nO1xuICBzY2hlbWE6IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBVc2VyIEluZm8gcmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTQuMS4zIChUT0RPOiBIYXZlIHRvIHVwZGF0ZSB0aGUgc2VjdGlvbilcbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXJJbmZvUmVxdWVzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhY2Nlc3NUb2tlbjogc3RyaW5nLCBwdWJsaWMgc2NoZW1hOiBzdHJpbmcsIHB1YmxpYyBleHRyYXM/OiBTdHJpbmdNYXApIHt9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgYSBVc2VySW5mb1JlcXVlc3QgdG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICovXG4gIHRvSnNvbigpOiBVc2VySW5mb1JlcXVlc3RKc29uIHtcbiAgICByZXR1cm4ge2FjY2Vzc190b2tlbjogdGhpcy5hY2Nlc3NUb2tlbiwgc2NoZW1hOiB0aGlzLnNjaGVtYSwgZXh0cmFzOiB0aGlzLmV4dHJhc307XG4gIH1cblxuICB0b1N0cmluZ01hcCgpOiBTdHJpbmdNYXAge1xuICAgIGxldCBtYXA6IFN0cmluZ01hcCA9IHthY2Nlc3NfdG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sIHNjaGVtYTogdGhpcy5zY2hlbWF9O1xuXG4gICAgLy8gY29weSBvdmVyIGV4dHJhc1xuICAgIGlmICh0aGlzLmV4dHJhcykge1xuICAgICAgZm9yIChsZXQgZXh0cmEgaW4gdGhpcy5leHRyYXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZXh0cmFzLmhhc093blByb3BlcnR5KGV4dHJhKSAmJiAhbWFwLmhhc093blByb3BlcnR5KGV4dHJhKSkge1xuICAgICAgICAgIC8vIGNoZWNrIGJlZm9yZSBpbnNlcnRpbmcgdG8gcmVxdWVzdE1hcFxuICAgICAgICAgIG1hcFtleHRyYV0gPSB0aGlzLmV4dHJhc1tleHRyYV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGlucHV0OiBVc2VySW5mb1JlcXVlc3RKc29uKTogVXNlckluZm9SZXF1ZXN0IHtcbiAgICByZXR1cm4gbmV3IFVzZXJJbmZvUmVxdWVzdChpbnB1dC5hY2Nlc3NfdG9rZW4sIGlucHV0LnNjaGVtYSwgaW5wdXQuZXh0cmFzKTtcbiAgfVxuXG4gIHNldEV4dHJhc0ZpZWxkKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XG4gICAgICB0aGlzLmV4dHJhc1trZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG59XG4iXX0=