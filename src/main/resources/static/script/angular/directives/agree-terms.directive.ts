import {Directive, Inject, Input, OnInit} from "@angular/core";
import {
    ConsoleComponent
} from "../components/elements/console/console.component";
import {AgreeTermsService} from "../services/agree-terms.service";
import {AuthPopup} from "../components/models/auth/AuthPopup";

@Directive({
    selector: '[agreeTerms]'
})
export class AgreeTermsDirective implements OnInit {
    constructor(private agreeTermsService: AgreeTermsService,
                @Inject(ConsoleComponent) private consoleComponent: ConsoleComponent) {
        console.log('AgreeTermsDirective loaded');
    }
    ngOnInit() {
        console.log('AgreeTermsDirective: ngOnInit');
        if (this.consoleComponent) {
            console.log('AgreeTermsDirective: setting up event listeners on ConsoleComponent');
            this.consoleComponent.termsAgreed.subscribe((isAgreed: boolean): void => {
                let authPopup = isAgreed ? null : AuthPopup.AGREE_TERMS;
                this.agreeTermsService.emitAgreeTerms(authPopup);
            });
        }
    }
}