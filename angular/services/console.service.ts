import {Injectable} from "@angular/core";
import {PasswordMatchHandlerService} from "./password-match-handler.service";
import {SignupHandlerService} from "./signup-handler.service";
import {EmailValidatorService} from "./email-validator.service";
import {ConsoleType} from "../components/elements/console/models/ConsoleType";
import {SignupService} from "./server/signup.service";
import {Observable} from "rxjs";
import {FilledFieldsService} from "./filled-fields.service";
import {AgreeTermsService} from "./agree-terms.service";

@Injectable({
    providedIn: 'root'
})
export class ConsoleService {
    constructor(private _passwordMatchHandlerService: PasswordMatchHandlerService,
                private _signupHandlerService: SignupHandlerService,
                private _emailValidatorService: EmailValidatorService,
                private _signupService: SignupService,
                private _filledFieldsService: FilledFieldsService,
                private _agreeTermsService: AgreeTermsService) {
        console.log('ConsoleService loaded');
    }
    isMismatchPassword(password: string, confirmPassword: string): boolean {
        return this.passwordMatchHandlerService.isMismatchPassword(password, confirmPassword);
    }
    isValidEmail(email: string): boolean {
        return this.emailValidatorService.isValidEmail(email);
    }
    isFilledFields(fields: string[]) {
        return this._filledFieldsService.isFilledFields(fields);
    }
    sendSignupToServer(username: string, email: string, unhashedPassword: string): Observable<boolean> {
        return this._signupService.sendSignupToServer(username, email, unhashedPassword);
    }
    shouldHandleAgreeTerms(consoleType: ConsoleType) {
        return consoleType === ConsoleType.SIGNUP;
    }
    shouldHandleFilledFields(consoleType: ConsoleType) {
        return consoleType === ConsoleType.SIGNUP || consoleType === ConsoleType.LOGIN;
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