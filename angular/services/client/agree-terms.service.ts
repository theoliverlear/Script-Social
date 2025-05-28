import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {AuthPopup} from "../../models/auth/AuthPopup";

@Injectable({
    providedIn: 'root'
})
export class AgreeTermsService {
    private agreeTermsSubject: Subject<AuthPopup> = new Subject();
    termsAgreed$ = this.agreeTermsSubject.asObservable();
    constructor() {

    }
    termsAgreed(terms: boolean): boolean {
        return terms;
    }
    emitAgreeTerms(authPopup: AuthPopup) {
        this.agreeTermsSubject.next(authPopup);
    }
}