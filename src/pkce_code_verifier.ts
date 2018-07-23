import * as crypto from 'crypto';

export class CodeVerifier {
  challenge: string;
  method: string;
  verifier: string;

  private base64URLEncode(value: Buffer) {
    return value.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  public static sha256(value: string) {
    return crypto.createHash('sha256').update(value).digest();
  }

  private getVerifier() {
    return this.base64URLEncode(crypto.randomBytes(32));
  }


  constructor() {
    this.verifier = this.getVerifier();

    this.challenge = this.base64URLEncode(CodeVerifier.sha256(this.verifier));
    this.method = 'S256';
  }
}