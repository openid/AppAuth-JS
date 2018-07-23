"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var CodeVerifier = /** @class */ (function () {
    function CodeVerifier() {
        this.verifier = this.getVerifier();
        this.challenge = this.base64URLEncode(CodeVerifier.sha256(this.verifier));
        this.method = 'S256';
    }
    CodeVerifier.prototype.base64URLEncode = function (value) {
        return value.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };
    CodeVerifier.sha256 = function (value) {
        return crypto.createHash('sha256').update(value).digest();
    };
    CodeVerifier.prototype.getVerifier = function () {
        return this.base64URLEncode(crypto.randomBytes(32));
    };
    return CodeVerifier;
}());
exports.CodeVerifier = CodeVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGtjZV9jb2RlX3ZlcmlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BrY2VfY29kZV92ZXJpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFpQztBQUVqQztJQWtCRTtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFsQk8sc0NBQWUsR0FBdkIsVUFBd0IsS0FBYTtRQUNuQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVhLG1CQUFNLEdBQXBCLFVBQXFCLEtBQWE7UUFDaEMsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBRU8sa0NBQVcsR0FBbkI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFTSCxtQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4Qlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSAnY3J5cHRvJztcblxuZXhwb3J0IGNsYXNzIENvZGVWZXJpZmllciB7XG4gIGNoYWxsZW5nZTogc3RyaW5nO1xuICBtZXRob2Q6IHN0cmluZztcbiAgdmVyaWZpZXI6IHN0cmluZztcblxuICBwcml2YXRlIGJhc2U2NFVSTEVuY29kZSh2YWx1ZTogQnVmZmVyKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKS5yZXBsYWNlKC9cXCsvZywgJy0nKS5yZXBsYWNlKC9cXC8vZywgJ18nKS5yZXBsYWNlKC89L2csICcnKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2hhMjU2KHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZSh2YWx1ZSkuZGlnZXN0KCk7XG4gIH1cblxuICBwcml2YXRlIGdldFZlcmlmaWVyKCkge1xuICAgIHJldHVybiB0aGlzLmJhc2U2NFVSTEVuY29kZShjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpKTtcbiAgfVxuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52ZXJpZmllciA9IHRoaXMuZ2V0VmVyaWZpZXIoKTtcblxuICAgIHRoaXMuY2hhbGxlbmdlID0gdGhpcy5iYXNlNjRVUkxFbmNvZGUoQ29kZVZlcmlmaWVyLnNoYTI1Nih0aGlzLnZlcmlmaWVyKSk7XG4gICAgdGhpcy5tZXRob2QgPSAnUzI1Nic7XG4gIH1cbn0iXX0=