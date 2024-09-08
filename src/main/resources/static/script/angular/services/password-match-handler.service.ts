import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PasswordMatchHandlerService {
    private passwordMismatchSubject: Subject<boolean> = new Subject();
    passwordMismatch$ = this.passwordMismatchSubject.asObservable();
    constructor() {
        console.log('PasswordMatchHandlerService loaded');
    }
    emitPasswordMismatch(isMismatch: boolean) {
        this.passwordMismatchSubject.next(isMismatch);
    }
}