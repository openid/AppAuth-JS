"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
/**
 * class for PKCE code challenge and code verifier generation.
 */
var CodeVerifier = /** @class */ (function () {
    function CodeVerifier() {
        this.verifier = this.getVerifier();
        this.challenge = this.base64URLEncode(CodeVerifier.sha256(this.verifier));
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
        return crypto.createHash('sha256').update(value).digest();
    };
    /**
     * Get PKCE code verifier code.
     */
    CodeVerifier.prototype.getVerifier = function () {
        return this.base64URLEncode(crypto.randomBytes(32));
    };
    return CodeVerifier;
}());
exports.CodeVerifier = CodeVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGtjZV9jb2RlX3ZlcmlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BrY2VfY29kZV92ZXJpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFpQztBQUVqQzs7R0FFRztBQUNIO0lBOEJFO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQTlCRDs7OztPQUlHO0lBQ0ssc0NBQWUsR0FBdkIsVUFBd0IsS0FBYTtRQUNuQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxtQkFBTSxHQUFwQixVQUFxQixLQUFhO1FBQ2hDLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVEOztPQUVHO0lBQ0ssa0NBQVcsR0FBbkI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFRSCxtQkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7QUFwQ1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSAnY3J5cHRvJztcblxuLyoqXG4gKiBjbGFzcyBmb3IgUEtDRSBjb2RlIGNoYWxsZW5nZSBhbmQgY29kZSB2ZXJpZmllciBnZW5lcmF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgQ29kZVZlcmlmaWVyIHtcbiAgY2hhbGxlbmdlOiBzdHJpbmc7XG4gIG1ldGhvZDogc3RyaW5nO1xuICB2ZXJpZmllcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBiYXNlNjQgZW5jb2RpbmdcbiAgICogXG4gICAqIEBwYXJhbSB2YWx1ZSB0ZXh0IHRvIGVuY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBiYXNlNjRVUkxFbmNvZGUodmFsdWU6IEJ1ZmZlcikge1xuICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykucmVwbGFjZSgvXFwrL2csICctJykucmVwbGFjZSgvXFwvL2csICdfJykucmVwbGFjZSgvPS9nLCAnJyk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgU0hBMjU2IGNvZGUgZm9yIGdpdmVuIHZhbHVlXG4gICAqIFxuICAgKiBAcGFyYW0gdmFsdWUgdGV4dCB0byBnZW5lcmF0ZSBTSEEyNTYgY29kZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBzaGEyNTYodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKHZhbHVlKS5kaWdlc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgUEtDRSBjb2RlIHZlcmlmaWVyIGNvZGUuXG4gICAqL1xuICBwcml2YXRlIGdldFZlcmlmaWVyKCkge1xuICAgIHJldHVybiB0aGlzLmJhc2U2NFVSTEVuY29kZShjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVyaWZpZXIgPSB0aGlzLmdldFZlcmlmaWVyKCk7XG5cbiAgICB0aGlzLmNoYWxsZW5nZSA9IHRoaXMuYmFzZTY0VVJMRW5jb2RlKENvZGVWZXJpZmllci5zaGEyNTYodGhpcy52ZXJpZmllcikpO1xuICAgIHRoaXMubWV0aG9kID0gJ1MyNTYnO1xuICB9XG59Il19