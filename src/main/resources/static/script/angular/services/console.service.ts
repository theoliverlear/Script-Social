import {Injectable} from "@angular/core";
import {PasswordMatchHandlerService} from "./password-match-handler.service";
import {SignupHandlerService} from "./signup-handler.service";
import {EmailValidatorService} from "./email-validator.service";
import {ConsoleType} from "../components/elements/console/models/ConsoleType";
import {SignupService} from "./signup.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConsoleService {
    constructor(private _passwordMatchHandlerService: PasswordMatchHandlerService,
                private _signupHandlerService: SignupHandlerService,
                private _emailValidatorService: EmailValidatorService,
                private _signupService: SignupService) {
        console.log('ConsoleService loaded');
    }
    isMismatchPassword(password: string, confirmPassword: string): boolean {
        return this.passwordMatchHandlerService.isMismatchPassword(password, confirmPassword);
    }
    isValidEmail(email: string): boolean {
        return this.emailValidatorService.isValidEmail(email);
    }
    sendSignupToServer(username: string, email: string, unhashedPassword: string): Observable<boolean> {
        return this._signupService.sendSignupToServer(username, email, unhashedPassword);
    }

    shouldValidateEmail(consoleType: ConsoleType) {
        return consoleType === ConsoleType.SIGNUP;
    }
    shouldHandlePasswordMismatch(consoleType: ConsoleType) {
        return consoleType === ConsoleType.SIGNUP;
    }
    shouldHandleSignupFailed(consoleType: ConsoleType) {
        return consoleType === ConsoleType.SIGNUP;
    }
    shouldHandleLoginFailed(consoleType: ConsoleType) {
        return consoleType === ConsoleType.LOGIN;
    }
    get passwordMatchHandlerService(): PasswordMatchHandlerService {
        return this._passwordMatchHandlerService;
    }
    get signupHandlerService(): SignupHandlerService {
        return this._signupHandlerService;
    }
    get emailValidatorService(): EmailValidatorService {
        return this._emailValidatorService;
    }
}