/**
 * The Test application.
 */
export declare class App {
    snackbar: Element;
    private notifier;
    private authorizationHandler;
    private tokenHandler;
    private configuration;
    private code;
    private tokenResponse;
    constructor(snackbar: Element);
    showMessage(message: string): void;
    fetchServiceConfiguration(): void;
    makeAuthorizationRequest(): void;
    makeTokenRequest(): void;
    checkForAuthorizationResponse(): void;
}
