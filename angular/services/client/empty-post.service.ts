import {Injectable} from "@angular/core";
import {
    ConsolePostPopup
} from "../../components/elements/element-group-post/element-group-general-post/general-post-comment/models/ConsolePostPopup";
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmptyPostService {
    private emptyPostSubject: Subject<ConsolePostPopup> = new Subject();
    emptyPost$: Observable<ConsolePostPopup> = this.emptyPostSubject.asObservable();
    constructor() {
        console.log('PostPopupService loaded');
    }
    // isEmptyPost(postText: string): boolean {
    //     let postIsNullOrUndefined = postText === null || postText === undefined;
    //     if (postIsNullOrUndefined) {
    //         return true;
    //     } else {
    //         return postText.trim().length === 0;
    //     }
    // }
    isPostTextEmpty(postText: string): boolean {
        let postIsNullOrUndefined = postText === null || postText === undefined;
        if (postIsNullOrUndefined) {
            return true;
        } else {
            return postText.trim().length === 0;
        }
    }
    isEmptyPost(postPopup: ConsolePostPopup): boolean {
        return postPopup === ConsolePostPopup.EMPTY;
    }
    emitEmptyPost(consolePostPopup: ConsolePostPopup) {
        this.emptyPostSubject.next(consolePostPopup);
    }
}