import {Component, OnInit} from "@angular/core";
import {ConsoleType} from "../../elements/console/models/ConsoleType";
import {TagType} from "../../elements/models/TagType";
import {AuthPopup} from "../../elements/models/auth/AuthPopup";
import {SignupHandlerService} from "../../../services/signup-handler.service";
import {
    PasswordMatchHandlerService
} from "../../../services/password-match-handler.service";
import {
    EmailValidatorService
} from "../../../services/email-validator.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home-style.component.css']
})
export class HomeComponent implements OnInit {
    title: string = 'Home | Script Social';
    authPopup: AuthPopup;
    stylesheets: string[] = [

        ];
    constructor(private signupHandlerService: SignupHandlerService,
                private passwordMatchHandlerService: PasswordMatchHandlerService,
                private emailValidatorService: EmailValidatorService) {
        console.log('HomeComponent loaded');
    }
    ngOnInit() {
        this.signupHandlerService.signupFailed$.subscribe((authPopup: AuthPopup): void => {
            this.authPopup = authPopup;
        });
        this.passwordMatchHandlerService.passwordMismatch$.subscribe((isMismatch: boolean): void => {
            this.authPopup = isMismatch ? AuthPopup.PASSWORDS_DONT_MATCH : null;
        });
        this.emailValidatorService.validEmail$.subscribe((authPopup: AuthPopup): void => {
            this.authPopup = authPopup;
        });
    }

    protected readonly ConsoleType = ConsoleType;
    protected readonly TagType = TagType;
}