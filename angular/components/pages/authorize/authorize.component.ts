import {Component, ViewChild} from "@angular/core";
import {ConsoleType} from "../../elements/element-group-console/console/models/ConsoleType";
import {AuthType} from "../../../models/auth/AuthType";
import {ConsoleComponent} from "../../elements/element-group-console/console/console.component";

@Component({
    selector: 'authorize',
    templateUrl: './authorize.component.html',
    styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent {
    selectedAuthType: AuthType | null = AuthType.SIGNUP;
    @ViewChild(ConsoleComponent) consoleComponent: ConsoleComponent;
    constructor() {

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