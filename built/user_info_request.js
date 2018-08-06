"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an User Info request.
 * For more information look at:
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoRequest
 */
var UserInfoRequest = /** @class */ (function () {
    function UserInfoRequest(accessToken, extras) {
        this.accessToken = accessToken;
        this.extras = extras;
    }
    /**
     * Serializes a UserInfoRequest to a JavaScript object.
     */
    UserInfoRequest.prototype.toJson = function () {
        return { access_token: this.accessToken, extras: this.extras };
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
        return new UserInfoRequest(input.access_token, input.extras);
    };
    UserInfoRequest.prototype.setExtrasField = function (key, value) {
        if (this.extras) {
            this.extras[key] = value;
        }
    };
    return UserInfoRequest;
}());
exports.UserInfoRequest = UserInfoRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXNlcl9pbmZvX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFXQTs7OztHQUlHO0FBQ0g7SUFDRSx5QkFBbUIsV0FBb0IsRUFBUyxNQUFrQjtRQUEvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBUztRQUFTLFdBQU0sR0FBTixNQUFNLENBQVk7SUFBRyxDQUFDO0lBRXRFOztPQUVHO0lBQ0gsZ0NBQU0sR0FBTjtRQUNFLE9BQU8sRUFBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0UsSUFBSSxHQUFHLEdBQWMsRUFBRSxDQUFDO1FBRXhCLG1CQUFtQjtRQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNuRSx1Q0FBdUM7b0JBQ3ZDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQzthQUNGO1NBQ0Y7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTSx3QkFBUSxHQUFmLFVBQWdCLEtBQTBCO1FBQ3hDLE9BQU8sSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELHdDQUFjLEdBQWQsVUFBZSxHQUFXLEVBQUUsS0FBYTtRQUN2QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMxQjtJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFuQ0QsSUFtQ0M7QUFuQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVXNlciBJbmZvIFJlcXVlc3QgYXMgSlNPTi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VySW5mb1JlcXVlc3RKc29uIHtcbiAgYWNjZXNzX3Rva2VuPzogc3RyaW5nO1xuICBleHRyYXM/OiBTdHJpbmdNYXA7XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIFVzZXIgSW5mbyByZXF1ZXN0LlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHA6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjVXNlckluZm9SZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBVc2VySW5mb1JlcXVlc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWNjZXNzVG9rZW4/OiBzdHJpbmcsIHB1YmxpYyBleHRyYXM/OiBTdHJpbmdNYXApIHt9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgYSBVc2VySW5mb1JlcXVlc3QgdG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICovXG4gIHRvSnNvbigpOiBVc2VySW5mb1JlcXVlc3RKc29uIHtcbiAgICByZXR1cm4ge2FjY2Vzc190b2tlbjogdGhpcy5hY2Nlc3NUb2tlbiwgZXh0cmFzOiB0aGlzLmV4dHJhc307XG4gIH1cblxuICB0b1N0cmluZ01hcCgpOiBTdHJpbmdNYXAge1xuICAgIGxldCBtYXA6IFN0cmluZ01hcCA9IHt9O1xuXG4gICAgLy8gY29weSBvdmVyIGV4dHJhc1xuICAgIGlmICh0aGlzLmV4dHJhcykge1xuICAgICAgZm9yIChsZXQgZXh0cmEgaW4gdGhpcy5leHRyYXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZXh0cmFzLmhhc093blByb3BlcnR5KGV4dHJhKSAmJiAhbWFwLmhhc093blByb3BlcnR5KGV4dHJhKSkge1xuICAgICAgICAgIC8vIGNoZWNrIGJlZm9yZSBpbnNlcnRpbmcgdG8gcmVxdWVzdE1hcFxuICAgICAgICAgIG1hcFtleHRyYV0gPSB0aGlzLmV4dHJhc1tleHRyYV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFwO1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGlucHV0OiBVc2VySW5mb1JlcXVlc3RKc29uKTogVXNlckluZm9SZXF1ZXN0IHtcbiAgICByZXR1cm4gbmV3IFVzZXJJbmZvUmVxdWVzdChpbnB1dC5hY2Nlc3NfdG9rZW4sIGlucHV0LmV4dHJhcyk7XG4gIH1cblxuICBzZXRFeHRyYXNGaWVsZChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLmV4dHJhcykge1xuICAgICAgdGhpcy5leHRyYXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufSJdfQ==