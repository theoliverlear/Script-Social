import {Component, ViewChild} from "@angular/core";
import {
    GeneralPostComment
} from "../general-post-comment/models/GeneralPostComment";
import {
    GeneralPostCommentInputComponent
} from "../general-post-comment-input/general-post-comment-input.component";

@Component({
    selector: 'general-post-footer',
    templateUrl: './general-post-footer.component.html',
    styleUrls: ['./general-post-footer.component.css']
})
export class GeneralPostFooterComponent {
    @ViewChild(GeneralPostCommentInputComponent) commentInput: GeneralPostCommentInputComponent;
    testPostComment: GeneralPostComment = new GeneralPostComment('Sarah',
        2, 1, 1,
        'Tremendously' +
        ' deep post! Wow! ' +
        'Really makes you think...');
    constructor() {
        console.log('GeneralPostFooterComponent loaded');
    }
    openCommentInput() {
        this.commentInput.openCommentInput();
    }
}