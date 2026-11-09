"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_ts_1 = require("./errors.js");
const url_validator_ts_1 = require("./url_validator.js");
describe('URL Validation Tests', () => {
    it('Passes for a valid input URL', () => {
        const input = 'https://accounts.google.com';
        const result = (0, url_validator_ts_1.requireValidUrl)(input);
        expect(result).toBe(input);
    });
    it('Fails for an invalid input URL', () => {
        const input = 'an invalid url';
        expect(() => {
            (0, url_validator_ts_1.requireValidUrl)(input);
        }).toThrow(new errors_ts_1.AppAuthError(`Invalid input url ${input}`));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3ZhbGlkYXRvcl90ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3VybF92YWxpZGF0b3JfdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUF5QztBQUN6Qyx5REFBbUQ7QUFFbkQsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtJQUNwQyxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLDZCQUE2QixDQUFDO1FBQzVDLE1BQU0sTUFBTSxHQUFHLElBQUEsa0NBQWUsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRTtRQUN4QyxNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztRQUMvQixNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1YsSUFBQSxrQ0FBZSxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLHdCQUFZLENBQUMscUJBQXFCLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBcHBBdXRoRXJyb3J9IGZyb20gJy4vZXJyb3JzLnRzJztcbmltcG9ydCB7cmVxdWlyZVZhbGlkVXJsfSBmcm9tICcuL3VybF92YWxpZGF0b3IudHMnO1xuXG5kZXNjcmliZSgnVVJMIFZhbGlkYXRpb24gVGVzdHMnLCAoKSA9PiB7XG4gIGl0KCdQYXNzZXMgZm9yIGEgdmFsaWQgaW5wdXQgVVJMJywgKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSc7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVxdWlyZVZhbGlkVXJsKGlucHV0KTtcbiAgICBleHBlY3QocmVzdWx0KS50b0JlKGlucHV0KTtcbiAgfSk7XG5cbiAgaXQoJ0ZhaWxzIGZvciBhbiBpbnZhbGlkIGlucHV0IFVSTCcsICgpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9ICdhbiBpbnZhbGlkIHVybCc7XG4gICAgZXhwZWN0KCgpID0+IHtcbiAgICAgIHJlcXVpcmVWYWxpZFVybChpbnB1dCk7XG4gICAgfSkudG9UaHJvdyhuZXcgQXBwQXV0aEVycm9yKGBJbnZhbGlkIGlucHV0IHVybCAke2lucHV0fWApKTtcbiAgfSk7XG59KTtcbiJdfQ==