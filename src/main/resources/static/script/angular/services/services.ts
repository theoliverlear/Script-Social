import {AgreeTermsService} from "./agree-terms.service";
import {ConsoleService} from "./console.service";
import {EmailValidatorService} from "./email-validator.service";
import {ErrorHandlerService} from "./error-handler.service";
import {FilledFieldsService} from "./filled-fields.service";
import {HashPasswordService} from "./hash-password.service";
import {
    PasswordMatchHandlerDirective
} from "../directives/password-match-handler.directive";
import {SignupService} from "./signup.service";
import {SignupHandlerService} from "./signup-handler.service";
import {SwipeService} from "./swipe.service";

export const services = [
    AgreeTermsService,
    ConsoleService,
    EmailValidatorService,
    ErrorHandlerService,
    FilledFieldsService,
    HashPasswordService,
    PasswordMatchHandlerDirective,
    SignupService,
    SignupHandlerService,
    SwipeService
]