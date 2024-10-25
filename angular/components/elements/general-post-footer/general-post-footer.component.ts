import {Component} from "@angular/core";
import {
    GeneralPostComment
} from "../general-post-comment/models/GeneralPostComment";

@Component({
    selector: 'general-post-footer',
    templateUrl: './general-post-footer.component.html',
    styleUrls: ['./general-post-footer-style.component.css']
})
export class GeneralPostFooterComponent {
    testPostComment: GeneralPostComment = new GeneralPostComment('Sarah',
        2, 1, 1,
        'Tremendously' +
        ' deep post! Wow! ' +
        'Really makes you think...');
    constructor() {
        console.log('GeneralPostFooterComponent loaded');
    }
}