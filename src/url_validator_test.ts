import {AppAuthError} from './errors.ts';
import {requireValidUrl} from './url_validator.ts';

describe('URL Validation Tests', () => {
  it('Passes for a valid input URL', () => {
    const input = 'https://accounts.google.com';
    const result = requireValidUrl(input);
    expect(result).toBe(input);
  });

  it('Fails for an invalid input URL', () => {
    const input = 'an invalid url';
    expect(() => {
      requireValidUrl(input);
    }).toThrow(new AppAuthError(`Invalid input url ${input}`));
  });
});
