import {Injectable} from "@angular/core";
import {AuthPopup} from "../components/elements/models/auth/AuthPopup";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SignupHandlerService {
    private signupFailedSubject: Subject<AuthPopup> = new Subject();
    signupFailed$ = this.signupFailedSubject.asObservable();
    constructor() {
        console.log('SignupHandlerService loaded');
    }
    emitSignupFailed(authPopup: AuthPopup) {
        this.signupFailedSubject.next(authPopup);
    }
}