/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents the access token types.
 * For more information see:
 * https://tools.ietf.org/html/rfc6749#section-7.1
 */
export type TokenType = 'bearer'|'mac';

/**
 * Represents the TokenResponse as a JSON Object.
 */
export interface TokenResponseJson {
  access_token: string;
  id_token?: string;      /* https://openid.net/specs/openid-connect-core-1_0.html#TokenResponse */
  token_type?: TokenType; /* treating token type as optional, as its going to be inferred. */
  issued_at?: number;     /* when was it issued ? */
  expires_in?: number;    /* lifetime in seconds. */
  refresh_token?: string;
  scope?: string;
}

/**
 * Represents the possible error codes from the token endpoint.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.2
 */
export type ErrorType = 'invalid_request'|'invalid_client'|'invalid_grant'|'unauthorized_client'|
    'unsupported_grant_type'|'invalid_scope';

/**
 * Represents the TokenError as a JSON Object.
 */
export interface TokenErrorJson {
  error: ErrorType;
  error_description?: string;
  error_uri?: string;
}

/**
 * Returns the instant of time in seconds.
 */
const nowInSeconds = () => Math.round(new Date().getTime() / 1000);

/**
 * Represents the Token Response type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.1
 */
export class TokenResponse {
  constructor(
      public accessToken: string,
      public idToken?: string,
      public refreshToken?: string,
      public scope?: string,
      public tokenType: TokenType = 'bearer',
      public issuedAt: number = nowInSeconds(),
      public expiresIn?: number) {}

  toJson(): TokenResponseJson {
    return {
      access_token: this.accessToken,
      id_token: this.idToken,
      refresh_token: this.refreshToken,
      scope: this.scope,
      token_type: this.tokenType,
      issued_at: this.issuedAt,
      expires_in: this.expiresIn
    };
  }

  isValid(): boolean {
    if (this.expiresIn) {
      let now = nowInSeconds();
      return now < this.issuedAt + this.expiresIn;
    } else {
      return true;
    }
  }

  static fromJson(input: TokenResponseJson): TokenResponse {
    const issuedAt = !input.issued_at ? nowInSeconds() : input.issued_at;
    return new TokenResponse(
        input.access_token,
        input.id_token,
        input.refresh_token,
        input.scope,
        input.token_type,
        issuedAt,
        input.expires_in)
  }
}

/**
 * Represents the Token Error type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.2
 */
export class TokenError {
  constructor(
      public readonly error: ErrorType,
      public readonly errorDescription?: string,
      public readonly errorUri?: string) {}

  toJson(): TokenErrorJson {
    return {
      error: this.error, error_description: this.errorDescription, error_uri: this.errorUri
    }
  }

  static fromJson(input: TokenErrorJson) {
    return new TokenError(input.error, input.error_description, input.error_uri);
  }
}
