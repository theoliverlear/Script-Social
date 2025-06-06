import {Directive, Input, OnInit} from "@angular/core";
import {
    ConsoleComponent
} from "../components/elements/element-group-console/console/console.component";
import {SignupPopupService} from "../services/client/signup-popup.service";
import {ConsoleType} from "../components/elements/element-group-console/console/models/ConsoleType";
import {AuthPopup} from "../models/auth/AuthPopup";

@Directive({
    selector: '[signupConsoleHandler]'
})
export class SignupConsoleHandlerDirective implements OnInit {
    @Input('signupConsoleHandler') consoleComponent: ConsoleComponent;
    constructor(private signupHandlerService: SignupPopupService) {
        console.log('SignupConsoleHandlerDirective loaded');
    }
    ngOnInit() {
        if (this.consoleComponent && this.consoleComponent.consoleType === ConsoleType.SIGNUP) {
            this.consoleComponent.signupFailed.subscribe((authPopup: AuthPopup): void => {
                this.signupHandlerService.emitSignupFailed(authPopup);
            });
        }
    }
}