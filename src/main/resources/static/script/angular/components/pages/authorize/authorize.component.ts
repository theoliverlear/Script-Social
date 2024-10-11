import {Component, ViewChild} from "@angular/core";
import {ConsoleType} from "../../elements/console/models/ConsoleType";
import {AuthType} from "../../models/auth/AuthType";
import {ConsoleComponent} from "../../elements/console/console.component";

@Component({
    selector: 'authorize',
    templateUrl: './authorize.component.html',
    styleUrls: ['./authorize-style.component.css']
})
export class AuthorizeComponent {
    selectedAuthType: AuthType | null = AuthType.SIGNUP;
    @ViewChild(ConsoleComponent) consoleComponent: ConsoleComponent;
    constructor() {
        console.log('AuthorizeComponent loaded');
    }
    get consoleType(): ConsoleType {
        return this.selectedAuthType === AuthType.SIGNUP ? ConsoleType.SIGNUP : ConsoleType.LOGIN;
    }
    onAuthTypeChange(authType: AuthType): void {
        this.selectedAuthType = authType;
        if (this.consoleComponent) {
            this.consoleComponent.clear();
        }
    }
}