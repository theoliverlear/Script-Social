import {Directive, Input, OnInit} from "@angular/core";
import {
    ConsoleComponent
} from "../../components/elements/element-group-console/console/console.component";
import {
    PasswordMatchService
} from "../../services/client/password-match.service";
import {AuthPopup} from "../../models/auth/AuthPopup";

@Directive({
    selector: '[passwordMatchHandler]'
})
export class PasswordMatchHandlerDirective implements OnInit {
    @Input('passwordMatchHandler') consoleComponent: ConsoleComponent;
    constructor(private passwordMatchHandlerService: PasswordMatchService) {
        console.log('PasswordMatchHandlerDirective loaded');
    }
    ngOnInit() {
        console.log('PasswordMatchHandlerDirective: ngOnInit');
        if (this.consoleComponent) {
            console.log('PasswordMatchHandlerDirective: setting up event listeners on ConsoleComponent');
            this.consoleComponent.passwordMismatch.subscribe((authPopup: AuthPopup): void => {
                this.passwordMatchHandlerService.emitPasswordMismatch(authPopup);
                this.consoleComponent.authPopup = authPopup;
            });
        }
    }
}