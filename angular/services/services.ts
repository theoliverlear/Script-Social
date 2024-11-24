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
import {WelcomeService} from "./server/welcome.service";
import {WelcomeRedirectService} from "./welcome-redirect.service";
import {LoginService} from "./server/login.service";
import {ConfettiService} from "./confetti.service";
import {SlideInElementService} from "./slide-in-element.service";

export const services = [
    // Server
    LoginService,
    MessageService,
    PostService,
    ProfilePictureService,
    SignupService,
    UserService,
    WelcomeService,
    // Client
    AgreeTermsService,
    ConfettiService,
    ConsoleService,
    EmailValidatorService,
    EmptyPostService,
    ErrorHandlerService,
    FilledFieldsService,
    HashPasswordService,
    PasswordMatchService,
    SignupPopupService,
    SlideInElementService,
    SwipeService,
    WelcomeRedirectService
]