"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_sha256_1 = require("js-sha256");
var crypto_utils_1 = require("./crypto_utils");
/**
 * class for PKCE code challenge and code verifier generation.
 */
var CodeVerifier = /** @class */ (function () {
    function CodeVerifier() {
        this.verifier = this.getVerifier();
        this.challenge = this.base64URLEncode(new Buffer(CodeVerifier.sha256(this.verifier)));
        this.method = 'S256';
    }
    /**
     * base64 encoding
     *
     * @param value text to encode
     */
    CodeVerifier.prototype.base64URLEncode = function (value) {
        return value.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };
    /**
     * Generate SHA256 code for given value
     *
     * @param value text to generate SHA256 code
     */
    CodeVerifier.sha256 = function (value) {
        return js_sha256_1.sha256.create().update(value).arrayBuffer();
    };
    /**
     * Get PKCE code verifier code.
     */
    CodeVerifier.prototype.getVerifier = function () {
        return this.base64URLEncode(new Buffer(crypto_utils_1.cryptoGenerateRandom(32), 'UTF-8'));
    };
    return CodeVerifier;
}());
exports.CodeVerifier = CodeVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGtjZV9jb2RlX3ZlcmlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BrY2VfY29kZV92ZXJpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFpQztBQUNqQywrQ0FBb0Q7QUFFcEQ7O0dBRUc7QUFDSDtJQThCRTtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQTlCRDs7OztPQUlHO0lBQ0ssc0NBQWUsR0FBdkIsVUFBd0IsS0FBYTtRQUNuQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxtQkFBTSxHQUFwQixVQUFxQixLQUFhO1FBQ2hDLE9BQU8sa0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVEOztPQUVHO0lBQ0ssa0NBQVcsR0FBbkI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxNQUFNLENBQUMsbUNBQW9CLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBUUgsbUJBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDO0FBcENZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtzaGEyNTZ9IGZyb20gJ2pzLXNoYTI1Nic7XG5pbXBvcnQge2NyeXB0b0dlbmVyYXRlUmFuZG9tfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5cbi8qKlxuICogY2xhc3MgZm9yIFBLQ0UgY29kZSBjaGFsbGVuZ2UgYW5kIGNvZGUgdmVyaWZpZXIgZ2VuZXJhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENvZGVWZXJpZmllciB7XG4gIGNoYWxsZW5nZTogc3RyaW5nO1xuICBtZXRob2Q6IHN0cmluZztcbiAgdmVyaWZpZXI6IHN0cmluZztcblxuICAvKipcbiAgICogYmFzZTY0IGVuY29kaW5nXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0ZXh0IHRvIGVuY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBiYXNlNjRVUkxFbmNvZGUodmFsdWU6IEJ1ZmZlcikge1xuICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykucmVwbGFjZSgvXFwrL2csICctJykucmVwbGFjZSgvXFwvL2csICdfJykucmVwbGFjZSgvPS9nLCAnJyk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgU0hBMjU2IGNvZGUgZm9yIGdpdmVuIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB0ZXh0IHRvIGdlbmVyYXRlIFNIQTI1NiBjb2RlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNoYTI1Nih2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHNoYTI1Ni5jcmVhdGUoKS51cGRhdGUodmFsdWUpLmFycmF5QnVmZmVyKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IFBLQ0UgY29kZSB2ZXJpZmllciBjb2RlLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRWZXJpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy5iYXNlNjRVUkxFbmNvZGUobmV3IEJ1ZmZlcihjcnlwdG9HZW5lcmF0ZVJhbmRvbSgzMiksICdVVEYtOCcpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVyaWZpZXIgPSB0aGlzLmdldFZlcmlmaWVyKCk7XG5cbiAgICB0aGlzLmNoYWxsZW5nZSA9IHRoaXMuYmFzZTY0VVJMRW5jb2RlKG5ldyBCdWZmZXIoQ29kZVZlcmlmaWVyLnNoYTI1Nih0aGlzLnZlcmlmaWVyKSkpO1xuICAgIHRoaXMubWV0aG9kID0gJ1MyNTYnO1xuICB9XG59Il19