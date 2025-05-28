import {Injectable} from "@angular/core";
import {AuthPopup} from "../../models/auth/AuthPopup";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SignupPopupService {
    private signupFailedSubject: Subject<AuthPopup> = new Subject();
    signupFailed$ = this.signupFailedSubject.asObservable();
    constructor() {
        console.log('SignupHandlerService loaded');
    }
    emitSignupFailed(authPopup: AuthPopup) {
        this.signupFailedSubject.next(authPopup);
    }
}