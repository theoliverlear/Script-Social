import {Directive, Input, OnInit} from "@angular/core";
import {
    ConsoleComponent
} from "../components/elements/console/console.component";
import {
    PasswordMatchHandlerService
} from "../services/password-match-handler.service";

@Directive({
    selector: '[passwordMatchHandler]'
})
export class PasswordMatchHandlerDirective implements OnInit {
    @Input('passwordMatchHandler') consoleComponent: ConsoleComponent;
    constructor(private passwordMatchHandlerService: PasswordMatchHandlerService) {
        console.log('PasswordMatchHandlerDirective loaded');
    }
    ngOnInit() {
        console.log('PasswordMatchHandlerDirective: ngOnInit');
        if (this.consoleComponent) {
            console.log('PasswordMatchHandlerDirective: setting up event listeners on ConsoleComponent');
            this.consoleComponent.passwordMismatch.subscribe((isMismatch: boolean): void => {
                this.passwordMatchHandlerService.emitPasswordMismatch(isMismatch);
            });
        }
    }
}