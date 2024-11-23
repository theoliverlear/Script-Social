import {AgreeTermsService} from "./agree-terms.service";
import {ConsoleService} from "./console.service";
import {EmailValidatorService} from "./email-validator.service";
import {ErrorHandlerService} from "./error-handler.service";
import {FilledFieldsService} from "./filled-fields.service";
import {HashPasswordService} from "./hash-password.service";
import {SignupService} from "./server/signup.service";
import {SignupPopupService} from "./signup-popup.service";
import {SwipeService} from "./swipe.service";
import {PostService} from "./server/post.service";
import {PasswordMatchService} from "./password-match.service";
import {UserService} from "./server/user.service";
import {EmptyPostService} from "./empty-post.service";
import {ProfilePictureService} from "./server/profile-picture.service";
import {MessageService} from "./server/message.service";

export const services = [
    // Server
    MessageService,
    PostService,
    ProfilePictureService,
    SignupService,
    UserService,
    // Client
    AgreeTermsService,
    ConsoleService,
    EmailValidatorService,
    EmptyPostService,
    ErrorHandlerService,
    FilledFieldsService,
    HashPasswordService,
    PasswordMatchService,
    SignupPopupService,
    SwipeService
]