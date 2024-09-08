import {Injectable} from "@angular/core";
import {PasswordMatchHandlerService} from "./password-match-handler.service";
import {SignupHandlerService} from "./signup-handler.service";
import {EmailValidatorService} from "./email-validator.service";
import {ConsoleType} from "../components/elements/console/models/ConsoleType";

@Injectable({
    providedIn: 'root'
})
export class ConsoleService {
    constructor(private _passwordMatchHandlerService: PasswordMatchHandlerService,
                private _signupHandlerService: SignupHandlerService,
                private _emailValidatorService: EmailValidatorService) {
        console.log('ConsoleService loaded');
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
}