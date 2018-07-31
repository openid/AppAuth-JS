import * as crypto from 'crypto';

/**
 * class for PKCE code challenge and code verifier generation.
 */
export class CodeVerifier {
  challenge: string;
  method: string;
  verifier: string;

  /**
   * base64 encoding
   * 
   * @param value text to encode
   */
  private base64URLEncode(value: Buffer) {
    return value.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  /**
   * Generate SHA256 code for given value
   * 
   * @param value text to generate SHA256 code
   */
  public static sha256(value: string) {
    return crypto.createHash('sha256').update(value).digest();
  }

  /**
   * Get PKCE code verifier code.
   */
  private getVerifier() {
    return this.base64URLEncode(crypto.randomBytes(32));
  }

  constructor() {
    this.verifier = this.getVerifier();

    this.challenge = this.base64URLEncode(CodeVerifier.sha256(this.verifier));
    this.method = 'S256';
  }
}