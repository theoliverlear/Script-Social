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
import {AuthPopup} from "../models/auth/AuthPopup";
import {SignupHandlerService} from "../services/signup-handler.service";
import {EmailValidatorService} from "../services/email-validator.service";
import {FilledFieldsService} from "../services/filled-fields.service";

@Directive({
    selector: '[autoAuthPopup]'
})
export class AutoAuthPopupDirective implements OnInit {
    @Input() autoAuthPopup(consoleType: ConsoleType, consoleComponent: ConsoleComponent): void {
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
        private emailValidatorService: EmailValidatorService,
        private filledFieldsService: FilledFieldsService) {}
    get consoleType(): ConsoleType {
        return this._consoleType;
    }
    get consoleComponent(): ConsoleComponent {
        return this._consoleComponent;
    }
    ngOnInit(): void {
        this.viewContainer.clear();

        if (this.consoleType === ConsoleType.SIGNUP) {

            console.log('ConsoleType: ', this.consoleType);
            if (this.consoleComponent) {
                console.log('AutoPopupDirective: setting up event listeners on ConsoleComponent');
                this.consoleComponent.passwordMismatch.subscribe((authPopup: AuthPopup) => {
                    console.log(authPopup);
                    this.passwordMatchHandlerService.emitPasswordMismatch(authPopup);
                    this.consoleComponent.authPopup = authPopup;
                });
                this.consoleComponent.signupFailed.subscribe((authPopup: AuthPopup) => {
                    this.signupHandlerService.emitSignupFailed(authPopup);
                });
                this.consoleComponent.validEmail.subscribe((email: string) => {
                    this.emailValidatorService.emitValidEmail(this.emailValidatorService.isValidEmail(email));
                });
                this.consoleComponent.termsAgreed.subscribe((termsAgreed: boolean) => {
                    let authPopup = termsAgreed ? null : AuthPopup.AGREE_TERMS;
                    this.signupHandlerService.emitSignupFailed(authPopup);
                });
            } else {
                console.error('ConsoleComponent not provided');
            }
        }
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.consoleComponent.filledFields.subscribe((field: string) => {
            let isFilledField = this.filledFieldsService.isFilledField(field);
            let authPopup = isFilledField ? null : AuthPopup.FILL_ALL_FIELDS;
            this.filledFieldsService.emitFilledFields(authPopup);
        });
    }
}