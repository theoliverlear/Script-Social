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
        // Elements
        NavBarComponent,
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
        // Pages
        HomeComponent,
        AuthorizeComponent
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
                EmailValidatorDirective,
                ConsoleService,
                ErrorHandlerService,
                HashPasswordService,
                SignupService,
                provideHttpClient(withFetch()),
                FilledFieldsService],
    bootstrap: [AppComponent],
    exports: [AppComponent, NavBarComponent, SsFooterComponent],
    schemas: []
})
export class ScriptSocialAppModule {
    constructor() {
        console.log('ScriptSocialAppModule loaded');
    }
}
