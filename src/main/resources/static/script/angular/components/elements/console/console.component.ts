import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ElementSize} from "../models/ElementSize";
import {ButtonText} from "../ss-button/models/ButtonText";
import {ConsoleInputField} from "../console-input/models/ConsoleInputField";
import {ConsoleInputType} from "../console-input/models/ConsoleInputType";
import {ButtonPosition} from "../ss-button/models/ButtonPosition";
import {ConsoleType} from "./models/ConsoleType";
import { sendSignupToServer } from "../../../../new_scripts/globalScript";
import {AuthPopup} from "../models/auth/AuthPopup";

@Component({
    selector: 'console',
    templateUrl: './console.component.html',
    styleUrls: ['./console-style.component.css']
})
export class ConsoleComponent {
    @Input() elementSize: ElementSize;
    @Input() consoleType: ConsoleType;
    @Output() signupFailed: EventEmitter<AuthPopup> = new EventEmitter();
    @Output() passwordMismatch: EventEmitter<boolean> = new EventEmitter();
    @Output() validEmail: EventEmitter<boolean> = new EventEmitter();
    authPopup: AuthPopup | null;
    private _email: string = '';
    private _username: string = '';
    private _password: string = '';
    private _confirmPassword: string = '';
    constructor() {
        console.log('ConsoleComponent loaded');
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
    handleEmailInput() {
        console.log('Handling email input');
        this.emitValidEmail(this.isValidEmail());
    }
    isValidEmail(): boolean {
        let emailPattern = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
        return emailPattern.test(this.email);
    }
    emitValidEmail(isValid: boolean) {
        console.log('Emitting valid email: ', isValid);
        this.authPopup = isValid ? null : AuthPopup.INVALID_EMAIL;
        this.validEmail.emit(isValid);
    }
    emitPasswordMismatch(isMismatch: boolean) {
        this.authPopup = isMismatch ? AuthPopup.PASSWORDS_DONT_MATCH : null;
        this.passwordMismatch.emit(isMismatch);
    }
    isPasswordMismatch(): boolean {
        console.log('Checking if passwords match: ', this.password, this.confirmPassword);
        return this.password !== this.confirmPassword;
    }
    handlePasswordMismatch() {
        console.log('Handling password mismatch');
        console.log('Passwords match: ', !this.isPasswordMismatch());
        this.emitPasswordMismatch(this.isPasswordMismatch());
    }
    handleSignupFailed(authPopup: AuthPopup) {
        this.signupFailed.emit(authPopup);
    }
    emitSignupFailed(authPopup: AuthPopup) {
        this.authPopup = authPopup;
        this.signupFailed.emit(authPopup);
    }
    sendSignupToServer() {
        console.log('Sending signup to server');
        console.log('Email: ', this.email);
        console.log('Username: ', this.username);
        console.log('Password: ', this.password);
        console.log('Confirm password: ', this.confirmPassword);
        let signupApproved = sendSignupToServer(this.email, this.username, this.password);
        if (!signupApproved) {
            this.emitSignupFailed(AuthPopup.USERNAME_OR_EMAIL_EXISTS);
        }
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
            default:
                consoleClass = 'console';
        }
        return consoleClass;
    }
    isSignup() {
        return this.consoleType === ConsoleType.SIGNUP;
    }
    isLogin() {
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