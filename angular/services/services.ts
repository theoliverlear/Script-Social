import {AgreeTermsService} from "./client/agree-terms.service";
import {ConsoleService} from "./client/console.service";
import {EmailValidatorService} from "./client/email-validator.service";
import {ErrorHandlerService} from "./client/error-handler.service";
import {FilledFieldsService} from "./client/filled-fields.service";
import {HashPasswordService} from "./client/hash-password.service";
import {SignupService} from "./server/http/signup.service";
import {SignupPopupService} from "./client/signup-popup.service";
import {SwipeService} from "./client/swipe.service";
import {PostService} from "./server/http/post.service";
import {PasswordMatchService} from "./client/password-match.service";
import {UserService} from "./server/http/user.service";
import {EmptyPostService} from "./client/empty-post.service";
import {ProfilePictureService} from "./server/http/profile-picture.service";
import {MessageService} from "./server/http/message.service";
import {WelcomeService} from "./server/http/welcome.service";
import {WelcomeRedirectService} from "./client/welcome-redirect.service";
import {LoginService} from "./server/http/login.service";
import {ConfettiService} from "./client/confetti.service";
import {SlideInElementService} from "./client/slide-in-element.service";
import {AuthGuard} from "./guard/auth.guard";

export const services = [
    // Guards
    AuthGuard,
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