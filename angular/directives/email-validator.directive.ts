import {Directive, Input, OnInit} from "@angular/core";
import {EmailValidatorService} from "../services/email-validator.service";
import {
    ConsoleComponent
} from "../components/elements/console/console.component";

@Directive({
    selector: '[emailValidator]'
})
export class EmailValidatorDirective implements OnInit {
    @Input('emailValidatorHandler') consoleComponent: ConsoleComponent;

    constructor(private emailValidatorService: EmailValidatorService) {
        console.log('EmailValidatorDirective loaded');
    }
    ngOnInit() {
        console.log('EmailValidatorDirective: ngOnInit');
        if (this.consoleComponent) {
            console.log('EmailValidatorDirective: validating email');
            this.consoleComponent.validEmail.subscribe((email: string): void => {
                let isValidEmail = this.emailValidatorService.isValidEmail(email);
                this.emailValidatorService.emitValidEmail(isValidEmail);
            });
        }
    }
}