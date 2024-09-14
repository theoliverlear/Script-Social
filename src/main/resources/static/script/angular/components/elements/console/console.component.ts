import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ElementSize} from "../models/ElementSize";
import {ButtonText} from "../ss-button/models/ButtonText";
import {ConsoleInputField} from "../console-input/models/ConsoleInputField";
import {ConsoleInputType} from "../console-input/models/ConsoleInputType";
import {ButtonPosition} from "../ss-button/models/ButtonPosition";
import {ConsoleType} from "./models/ConsoleType";
import {
    sendLoginRequest,
    sendSignupToServer
} from "../../../../new_scripts/globalScript";
import {AuthPopup} from "../models/auth/AuthPopup";
import {ConsoleService} from "../../../services/console.service";
import {fadeAnimation} from "../../animations/animations";

@Component({
    selector: 'console',
    templateUrl: './console.component.html',
    styleUrls: ['./console-style.component.css'],
    animations: [
        fadeAnimation
    ]
})
export class ConsoleComponent {
    @Input() elementSize: ElementSize;
    @Input() consoleType: ConsoleType;
    @Output() signupFailed: EventEmitter<AuthPopup> = new EventEmitter();
    @Output() passwordMismatch: EventEmitter<AuthPopup> = new EventEmitter();
    @Output() validEmail: EventEmitter<boolean> = new EventEmitter();
    @Output() filledFields: EventEmitter<AuthPopup> = new EventEmitter();
    @Output() termsAgreed: EventEmitter<AuthPopup> = new EventEmitter();
    authPopup: AuthPopup | null;
    private _email: string = '';
    private _username: string = '';
    private _password: string = '';
    private _confirmPassword: string = '';
    private _agreeTerms: boolean = false;
    constructor(private consoleService: ConsoleService) {
        console.log('ConsoleComponent loaded');
    }
    get agreeTerms(): boolean {
        return this._agreeTerms;
    }
    set agreeTerms(value: boolean) {
        console.log('Setting agree terms: ', value);
        this._agreeTerms = value;
    }
    get password(): string {
        return this._password;
    }
    set password(value: string) {
        this._password = value;
        this.handlePasswordMismatch();
    }
    get confirmPassword(): string {
        return this._confirmPassword;
    }
    set confirmPassword(value: string) {
        this._confirmPassword = value;
        this.handlePasswordMismatch();
    }
    get email(): string {
        return this._email;
    }
    set email(value: string) {
        this._email = value;
        this.handleEmailInput();
    }
    get username(): string {
        return this._username;
    }
    set username(value: string) {
        this._username = value;
        // TODO: Add handling for username input
    }
    handleTermsSelectedChange(termsAgreed: boolean) {
        console.log(`Registering change of termsAgreed from ${this.agreeTerms} to ${termsAgreed}`);
        this.agreeTerms = termsAgreed;
        this.handleTermsAgreed();
    }
    handleTermsAgreed() {
        console.log('Handling terms agreed');
        let shouldHandleAgreeTerms: boolean = this.consoleService.shouldHandleAgreeTerms(this.consoleType);
        console.log('Should handle agree terms: ', shouldHandleAgreeTerms);
        if (shouldHandleAgreeTerms) {
            console.log('Terms agreed: ', this.agreeTerms);
            this.emitAgreeTerms(this.agreeTerms);
        }
    }
    emitAgreeTerms(termsAgreed: boolean) {
        let authPopup = termsAgreed ? null : AuthPopup.AGREE_TERMS;
        this.authPopup = authPopup;
        this.termsAgreed.emit(authPopup);
    }
    handleFilledFields() {
        if (this.consoleService.shouldHandleFilledFields(this.consoleType)) {
            let fieldsFilled: boolean = this.consoleService.isFilledFields([this.email, this.username, this.password, this.confirmPassword]);
            this.emitFilledFields(fieldsFilled);
        }
    }
    emitFilledFields(isFilledFields: boolean) {
        let authPopup = isFilledFields ? null : AuthPopup.FILL_ALL_FIELDS;
        this.authPopup = authPopup;
        this.filledFields.emit(authPopup);
    }
    handleEmailInput() {
        let shouldHandleEmailInput = this.consoleService.shouldValidateEmail(this.consoleType);
        console.log('Handling email input');
        if (shouldHandleEmailInput) {
            this.emitValidEmail(this.consoleService.isValidEmail(this.email));
        }
    }
    emitValidEmail(isValid: boolean) {
        console.log('Emitting valid email: ', isValid);
        this.authPopup = isValid ? null : AuthPopup.INVALID_EMAIL;
        this.validEmail.emit(isValid);
    }
    emitPasswordMismatch(isMismatch: boolean) {
        let authPopup = isMismatch ? AuthPopup.PASSWORDS_DONT_MATCH : null;
        this.authPopup = authPopup;
        this.passwordMismatch.emit(authPopup);
    }
    handlePasswordMismatch() {
        let shouldHandlePasswordMismatch = this.consoleService.shouldHandlePasswordMismatch(this.consoleType);
        if (shouldHandlePasswordMismatch) {
            console.log('Handling password mismatch');
            this.emitPasswordMismatch(this.consoleService.isMismatchPassword(this.password, this.confirmPassword));
        }
    }
    handleSignupFailed(authPopup: AuthPopup) {
        let shouldHandleSignupFailed = this.consoleService.shouldHandleSignupFailed(this.consoleType);
        if (shouldHandleSignupFailed) {
            this.authPopup = authPopup;
            this.emitSignupFailed(authPopup);
        }
    }
    emitSignupFailed(authPopup: AuthPopup) {
        this.signupFailed.emit(authPopup);
    }
    authPrerequisitesSucceed() {
        let fieldsFilled = this.consoleService.isFilledFields([this.email, this.username, this.password, this.confirmPassword]);
        console.log('Fields filled: ', fieldsFilled);
        console.log('Agree terms: ', this.agreeTerms);
        return fieldsFilled && this.agreeTerms;
    }
    handleAuthPrerequisites(): void {
        let filledFields = this.consoleService.isFilledFields([this.email, this.username, this.password, this.confirmPassword]);
        if (!filledFields) {
            this.handleFilledFields();
            return;
        }
        if (this.isSignup() && !this.agreeTerms) {
            this.handleTermsAgreed();
            return;
        }
    }
    sendAuthToServer() {
        let prerequisitesFailed = !this.authPrerequisitesSucceed();
        console.log('Prerequisites failed: ', prerequisitesFailed);
        if (prerequisitesFailed) {
            this.handleAuthPrerequisites();
        } else if (this.isSignup()) {
            this.sendSignupToServer();
        } else if (this.isLogin()) {
            this.sendLoginToServer();
        }
    }
    handleLoginFailed(authPopup: AuthPopup) {
        let shouldHandleLoginFailed = this.consoleService.shouldHandleLoginFailed(this.consoleType);
        if (shouldHandleLoginFailed) {
            this.authPopup = authPopup;
            this.emitLoginFailed(authPopup);
        }
    }
    emitLoginFailed(authPopup: AuthPopup) {
        this.signupFailed.emit(authPopup);
    }
    sendLoginToServer() {
        let loginApproved: boolean = sendLoginRequest(this.username, this.password);
        if (!loginApproved) {
            this.handleLoginFailed(AuthPopup.INVALID_USERNAME_OR_PASSWORD);
        } else {
            this.redirectToWelcome();
        }
    }
    redirectToWelcome() {
        window.location.href = '/welcome/';
    }
    sendSignupToServer() {
        console.log('Sending signup to server');
        console.log('Email: ', this.email);
        console.log('Username: ', this.username);
        console.log('Password: ', this.password);
        console.log('Confirm password: ', this.confirmPassword);
        // let signupApproved = sendSignupToServer(this.email, this.username, this.password);
        this.consoleService.sendSignupToServer(this.username, this.email, this.password).subscribe(signupApproved => {
            if (!signupApproved) {
                this.handleSignupFailed(AuthPopup.USERNAME_OR_EMAIL_EXISTS);
            } else {
                this.redirectToWelcome();
            }
        }, error => {
            console.error('Error: ', error);
            this.handleSignupFailed(AuthPopup.SERVER_ERROR);
        });
    }

    getConsoleClass() {
        let consoleClass = '';
        switch (this.elementSize) {
            case ElementSize.SMALL:
                consoleClass = 'small-console';
                break;
            case ElementSize.MEDIUM:
                consoleClass = 'medium-console';
                break;
            case ElementSize.LARGE:
                consoleClass = 'large-console';
                break;
            case ElementSize.VERY_LARGE:
                consoleClass = 'very-large-console';
                break;
            default:
                consoleClass = 'console';
        }
        return consoleClass;
    }
    isSignup(): boolean {
        return this.consoleType === ConsoleType.SIGNUP;
    }
    isLogin(): boolean {
        return this.consoleType === ConsoleType.LOGIN;
    }
    protected readonly ConsoleInputType = ConsoleInputType;
    protected readonly ButtonText = ButtonText;
    protected readonly ElementSize = ElementSize;
    protected readonly ButtonPosition = ButtonPosition;
    protected readonly ConsoleInputField = ConsoleInputField;
    protected readonly AuthPopup = AuthPopup;
    protected readonly ConsoleType = ConsoleType;
}