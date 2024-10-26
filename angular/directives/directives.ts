import {AgreeTermsDirective} from "./agree-terms.directive";
import {AutoPasswordMatchDirective} from "./auto-password-match.directive";
import {AutoAuthPopupDirective} from "./auto-auth-popup.directive";
import {AutoSignupConsoleDirective} from "./auto-signup-console.directive";
import {EmailValidatorDirective} from "./email-validator.directive";
import {
    FilledFieldsHandlerDirective
} from "./filled-fields-handler.directive";
import {
    PasswordMatchHandlerDirective
} from "./password-match-handler.directive";
import {
    SignupConsoleHandlerDirective
} from "./signup-console-handler.directive";
import {UndraggableDirective} from "./undraggable.directive";
import {UnoptimizedImageDirective} from "./unoptimized-image.directive";
import {EmptyPostHandlerDirective} from "./empty-post-handler.directive";
import {
    AutoEmptyPostHandlerDirective
} from "./auto-empty-post-handler.directive";

export const directives = [
    AgreeTermsDirective,
    AutoAuthPopupDirective,
    AutoEmptyPostHandlerDirective,
    AutoPasswordMatchDirective,
    AutoSignupConsoleDirective,
    EmailValidatorDirective,
    EmptyPostHandlerDirective,
    FilledFieldsHandlerDirective,
    PasswordMatchHandlerDirective,
    SignupConsoleHandlerDirective,
    UndraggableDirective,
    UnoptimizedImageDirective
]