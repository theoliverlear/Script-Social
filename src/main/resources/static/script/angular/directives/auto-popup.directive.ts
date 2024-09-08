import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {ConsoleType} from '../components/elements/console/models/ConsoleType';
import {
    ConsoleComponent
} from '../components/elements/console/console.component';
import {
    PasswordMatchHandlerService
} from '../services/password-match-handler.service';
import {AuthPopup} from "../components/elements/models/auth/AuthPopup";
import {SignupHandlerService} from "../services/signup-handler.service";
import {EmailValidatorService} from "../services/email-validator.service";

@Directive({
    selector: '[autoPopup]'
})
export class AutoPopupDirective implements OnInit {
    @Input() autoPopup(consoleType: ConsoleType, consoleComponent: ConsoleComponent): void {
        this._consoleType = consoleType;
        this._consoleComponent = consoleComponent;
        this.ngOnInit();
    }
    private _consoleType: ConsoleType;
    private _consoleComponent: ConsoleComponent;
    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private passwordMatchHandlerService: PasswordMatchHandlerService,
        private signupHandlerService: SignupHandlerService,
        private emailValidatorService: EmailValidatorService) {}
    get consoleType(): ConsoleType {
        return this._consoleType;
    }
    get consoleComponent(): ConsoleComponent {
        return this._consoleComponent;
    }
    ngOnInit(): void {
        this.viewContainer.clear();

        if (this.consoleType === ConsoleType.SIGNUP) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            console.log('ConsoleType: ', this.consoleType);
            if (this.consoleComponent) {
                console.log('AutoPopupDirective: setting up event listeners on ConsoleComponent');
                this.consoleComponent.passwordMismatch.subscribe((isMismatch: boolean) => {
                    console.log(isMismatch);
                    this.passwordMatchHandlerService.emitPasswordMismatch(isMismatch);
                    this.consoleComponent.authPopup = isMismatch ? AuthPopup.PASSWORDS_DONT_MATCH : null;
                });
                this.consoleComponent.signupFailed.subscribe((authPopup: AuthPopup) => {
                    this.signupHandlerService.emitSignupFailed(authPopup);
                });
                this.consoleComponent.validEmail.subscribe((email: string) => {
                    this.emailValidatorService.emitValidEmail(this.emailValidatorService.isValidEmail(email));
                });
            } else {
                console.error('ConsoleComponent not provided');
            }
        } else if (this.consoleType === ConsoleType.LOGIN) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}