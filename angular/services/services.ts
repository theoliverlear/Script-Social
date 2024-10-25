import {AgreeTermsService} from "./agree-terms.service";
import {ConsoleService} from "./console.service";
import {EmailValidatorService} from "./email-validator.service";
import {ErrorHandlerService} from "./error-handler.service";
import {FilledFieldsService} from "./filled-fields.service";
import {HashPasswordService} from "./hash-password.service";
import {SignupService} from "./server/signup.service";
import {SignupHandlerService} from "./signup-handler.service";
import {SwipeService} from "./swipe.service";
import {PostService} from "./server/post.service";
import {PasswordMatchHandlerService} from "./password-match-handler.service";
import {UserService} from "./server/user.service";

export const services = [
    // Server
    PostService,
    SignupService,
    UserService,
    // Other
    AgreeTermsService,
    ConsoleService,
    EmailValidatorService,
    ErrorHandlerService,
    FilledFieldsService,
    HashPasswordService,
    PasswordMatchHandlerService,
    SignupHandlerService,
    SwipeService
]