import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { AppComponent } from '../components/app/app.component';
import { NavBarComponent } from '../components/elements/nav-bar/nav-bar.component';
import {NgOptimizedImage} from "@angular/common";
import { SsFooterComponent } from '../components/elements/ss-footer/ss-footer.component';
import {FormsModule} from "@angular/forms";
import { AppRouting } from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "../components/pages/home/home.component";
import {
    HeadComponent
} from "../components/elements/ss-head/ss-head.component";
import {
    UnoptimizedImageDirective
} from "../directives/unoptimized-image.directive";
import {
    ConsoleComponent
} from "../components/elements/console/console.component";
import {
    AuthorizeComponent
} from "../components/pages/authorize/authorize.component";
import {
    SsButtonComponent
} from "../components/elements/ss-button/ss-button.component";
import {
    ConsoleInputComponent
} from "../components/elements/console-input/console-input.component";
import {UndraggableDirective} from "../directives/undraggable.directive";
import {
    ConsolePopupComponent
} from "../components/elements/console-popup/console-popup.component";
import {
    TypableTextComponent
} from "../components/elements/typable-text/typable-text.component";
import {
    BlinkingCursorComponent
} from "../components/elements/blinking-cursor/blinking-cursor.component";
import {SignupHandlerService} from "../services/signup-handler.service";
import {
    SignupConsoleHandlerDirective
} from "../directives/signup-console-handler.directive";
import {
    AutoSignupConsoleDirective
} from "../directives/auto-signup-console.directive";
import {
    PasswordMatchHandlerService
} from "../services/password-match-handler.service";
import {
    PasswordMatchHandlerDirective
} from "../directives/password-match-handler.directive";
import {
    AutoPasswordMatchDirective
} from "../directives/auto-password-match.directive";
import {AutoPopupDirective} from "../directives/auto-popup.directive";
import {
    EmailValidatorDirective
} from "../directives/email-validator.directive";
import {ConsoleService} from "../services/console.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SsImgComponent} from "../components/elements/ss-img/ss-img.component";
import {
    AuthBubbleComponent
} from "../components/elements/auth-bubble/auth-bubble.component";
import {
    AuthTypeSelectorComponent
} from "../components/elements/auth-type-selector/auth-type-selector.component";
import {ErrorHandlerService} from "../services/error-handler.service";
import {HashPasswordService} from "../services/hash-password.service";
import {SignupService} from "../services/signup.service";
import {
    HttpClientModule,
    provideHttpClient,
    withFetch
} from "@angular/common/http";
import {
    FilledFieldsHandlerDirective
} from "../directives/filled-fields-handler.directive";
import {FilledFieldsService} from "../services/filled-fields.service";
import {AgreeTermsDirective} from "../directives/agree-terms.directive";
import {EmailValidatorService} from "../services/email-validator.service";
import {AgreeTermsService} from "../services/agree-terms.service";
import {
    ProfileComponent
} from "../components/pages/profile/profile.component";
import {
    HeadlineButtonComponent
} from "../components/elements/headline-button/headline-button.component";
import {
    ProfileHeadlineButtonsComponent
} from "../components/elements/profile-headline-buttons/profile-headline-buttons.component";
import {
    SideNavBarComponent
} from "../components/elements/side-nav-bar/side-nav-bar.component";
import {
    SideNavBarButtonComponent
} from "../components/elements/side-nav-bar-button/side-nav-bar-button.component";

@NgModule({
    declarations: [
        // Directives
        UnoptimizedImageDirective,
        UndraggableDirective,
        SignupConsoleHandlerDirective,
        AutoSignupConsoleDirective,
        PasswordMatchHandlerDirective,
        AutoPasswordMatchDirective,
        AutoPopupDirective,
        EmailValidatorDirective,
        FilledFieldsHandlerDirective,
        AgreeTermsDirective,
        // Elements
        NavBarComponent,
        SideNavBarComponent,
        SideNavBarButtonComponent,
        ConsoleComponent,
        ConsoleInputComponent,
        AppComponent,
        SsFooterComponent,
        HeadComponent,
        SsButtonComponent,
        ConsolePopupComponent,
        TypableTextComponent,
        BlinkingCursorComponent,
        SsImgComponent,
        AuthBubbleComponent,
        AuthTypeSelectorComponent,
        HeadlineButtonComponent,
        ProfileHeadlineButtonsComponent,
        // Pages
        HomeComponent,
        AuthorizeComponent,
        ProfileComponent
    ],
    imports: [BrowserModule,
              BrowserAnimationsModule,
              FormsModule,
              AppRouting,
              RouterOutlet,
              NgOptimizedImage,
              HttpClientModule],
    providers: [SignupHandlerService,
                PasswordMatchHandlerService,
                EmailValidatorService,
                ConsoleService,
                ErrorHandlerService,
                HashPasswordService,
                SignupService,
                AgreeTermsService,
                provideHttpClient(withFetch()),
                FilledFieldsService],
    bootstrap: [AppComponent],
    exports: [AppComponent],
    schemas: []
})
export class ScriptSocialAppModule {
    constructor() {
        console.log('ScriptSocialAppModule loaded');
    }
}
