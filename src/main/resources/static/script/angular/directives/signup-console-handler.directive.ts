import {Directive, Input, OnInit} from "@angular/core";
import {
    ConsoleComponent
} from "../components/elements/console/console.component";
import {SignupHandlerService} from "../services/signup-handler.service";
import {ConsoleType} from "../components/elements/console/models/ConsoleType";
import {AuthPopup} from "../components/elements/models/auth/AuthPopup";

@Directive({
    selector: '[signupConsoleHandler]'
})
export class SignupConsoleHandlerDirective implements OnInit {
    @Input('signupConsoleHandler') consoleComponent: ConsoleComponent;
    constructor(private signupHandlerService: SignupHandlerService) {
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