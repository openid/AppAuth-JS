"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var url_validator_1 = require("./url_validator");
describe('URL Validation Tests', function () {
    it('Passes for a valid input URL', function () {
        var input = 'https://accounts.google.com';
        var result = (0, url_validator_1.requireValidUrl)(input);
        expect(result).toBe(input);
    });
    it('Fails for an invalid input URL', function () {
        var input = 'an invalid url';
        expect(function () {
            (0, url_validator_1.requireValidUrl)(input);
        }).toThrow(new errors_1.AppAuthError("Invalid input url ".concat(input)));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3ZhbGlkYXRvcl90ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VybF92YWxpZGF0b3JfdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFzQztBQUN0QyxpREFBZ0Q7QUFFaEQsUUFBUSxDQUFDLHNCQUFzQixFQUFFO0lBQy9CLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtRQUNqQyxJQUFNLEtBQUssR0FBRyw2QkFBNkIsQ0FBQztRQUM1QyxJQUFNLE1BQU0sR0FBRyxJQUFBLCtCQUFlLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUNuQyxJQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztRQUMvQixNQUFNLENBQUM7WUFDTCxJQUFBLCtCQUFlLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUkscUJBQVksQ0FBQyw0QkFBcUIsS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHtyZXF1aXJlVmFsaWRVcmx9IGZyb20gJy4vdXJsX3ZhbGlkYXRvcic7XG5cbmRlc2NyaWJlKCdVUkwgVmFsaWRhdGlvbiBUZXN0cycsICgpID0+IHtcbiAgaXQoJ1Bhc3NlcyBmb3IgYSB2YWxpZCBpbnB1dCBVUkwnLCAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tJztcbiAgICBjb25zdCByZXN1bHQgPSByZXF1aXJlVmFsaWRVcmwoaW5wdXQpO1xuICAgIGV4cGVjdChyZXN1bHQpLnRvQmUoaW5wdXQpO1xuICB9KTtcblxuICBpdCgnRmFpbHMgZm9yIGFuIGludmFsaWQgaW5wdXQgVVJMJywgKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gJ2FuIGludmFsaWQgdXJsJztcbiAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgcmVxdWlyZVZhbGlkVXJsKGlucHV0KTtcbiAgICB9KS50b1Rocm93KG5ldyBBcHBBdXRoRXJyb3IoYEludmFsaWQgaW5wdXQgdXJsICR7aW5wdXR9YCkpO1xuICB9KTtcbn0pO1xuIl19