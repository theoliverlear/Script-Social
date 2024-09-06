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

@NgModule({
    declarations: [
        // Directives
        UnoptimizedImageDirective,
        UndraggableDirective,
        // Elements
        NavBarComponent,
        ConsoleComponent,
        ConsoleInputComponent,
        AppComponent,
        SsFooterComponent,
        HeadComponent,
        SsButtonComponent,
        ConsolePopupComponent,
        // Pages
        HomeComponent,
        AuthorizeComponent
    ],
    imports: [BrowserModule, FormsModule, AppRouting, RouterOutlet, NgOptimizedImage],
    providers: [],
    bootstrap: [AppComponent],
    exports: [AppComponent, NavBarComponent, SsFooterComponent],
    schemas: []
})
export class ScriptSocialAppModule {
    constructor() {
        console.log('ScriptSocialAppModule loaded');
    }
}
