import {AgreeTermsDirective} from "./auto/agree-terms.directive";
import {AutoPasswordMatchDirective} from "./auto/auto-password-match.directive";
import {AutoAuthPopupDirective} from "./auto/auto-auth-popup.directive";
import {AutoSignupConsoleDirective} from "./auto/auto-signup-console.directive";
import {EmailValidatorDirective} from "./validation/email-validator.directive";
import {
    FilledFieldsHandlerDirective
} from "./validation/filled-fields-handler.directive";
import {
    PasswordMatchHandlerDirective
} from "./validation/password-match-handler.directive";
import {
    SignupConsoleHandlerDirective
} from "./signup-console-handler.directive";
import {UndraggableDirective} from "./undraggable.directive";
import {UnoptimizedImageDirective} from "./unoptimized-image.directive";
import {EmptyPostHandlerDirective} from "./validation/empty-post-handler.directive";
import {
    AutoEmptyPostHandlerDirective
} from "./auto/auto-empty-post-handler.directive";
import {SyntaxHighlightDirective} from "./syntax-highlight.directive";

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
    SyntaxHighlightDirective,
    UndraggableDirective,
    UnoptimizedImageDirective
]