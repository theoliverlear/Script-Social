import {Component, Input} from "@angular/core";
import {GeneralPostComment} from "./models/GeneralPostComment";
import {defaultAvatar} from "../../../assets/imageAssets";
import {TextElementLink} from "../../../models/link/TextElementLink";
import {TargetType} from "../../../models/html/TargetType";

@Component({
    selector: 'general-post-comment',
    templateUrl: './general-post-comment.component.html',
    styleUrls: ['./general-post-comment-style.component.css']
})
export class GeneralPostCommentComponent {
    @Input() generalPostComment: GeneralPostComment;
    testElementLink: TextElementLink = new TextElementLink('/profile/2', TargetType.SELF, false);
    constructor() {
        console.log('GeneralPostCommentComponent loaded');
    }

    protected readonly defaultAvatar = defaultAvatar;
}