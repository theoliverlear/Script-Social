import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {AuthPopup} from "../components/elements/models/auth/AuthPopup";

@Injectable({
    providedIn: 'root'
})
export class FilledFieldsService {
    private filledFieldsService: Subject<AuthPopup> = new Subject();
    fieldsFilled$: Observable<AuthPopup> = this.filledFieldsService.asObservable();
    constructor() {
        console.log('FilledFieldsService loaded');
    }
    isFilledField(field: string): boolean {
        return field.length > 0;
    }
    emitFilledFields(authPopup: AuthPopup) {
        this.filledFieldsService.next(authPopup);
    }
}