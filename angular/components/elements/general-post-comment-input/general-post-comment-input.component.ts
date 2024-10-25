import {Component} from "@angular/core";

@Component({
    selector: 'general-post-comment-input',
    templateUrl: './general-post-comment-input.component.html',
    styleUrls: ['./general-post-comment-input-style.component.css']
})
export class GeneralPostCommentInputComponent {
    constructor() {
        console.log('GeneralPostCommentInputComponent loaded');
    }
}