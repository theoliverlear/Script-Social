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
    JoinConsoleComponent
} from "../components/elements/join-console/join-console.component";
import {
    AuthorizeComponent
} from "../components/pages/authorize/authorize.component";

@NgModule({
    declarations: [

        // Directives
        UnoptimizedImageDirective,


        // Elements
        NavBarComponent,
        JoinConsoleComponent,
        AppComponent,
        SsFooterComponent,
        HeadComponent,
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
