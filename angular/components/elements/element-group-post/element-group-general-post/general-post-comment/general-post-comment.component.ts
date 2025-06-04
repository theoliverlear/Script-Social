import {Component, Input} from "@angular/core";
import {GeneralPostComment} from "./models/GeneralPostComment";
import {defaultAvatar} from "../../../../../assets/imageAssets";
import {TextElementLink} from "../../../../../models/link/TextElementLink";
import {TargetType} from "../../../../../models/html/TargetType";
import {ElementSize} from "../../../../../models/ElementSize";
import {ElementLink} from "../../../../../models/link/ElementLink";

@Component({
    selector: 'general-post-comment',
    templateUrl: './general-post-comment.component.html',
    styleUrls: ['./general-post-comment.component.css']
})
export class GeneralPostCommentComponent {
    @Input() generalPostComment: GeneralPostComment;
    testElementLink: ElementLink = new ElementLink('/profile/2', TargetType.SELF, false);
    constructor() {

    }

    protected readonly defaultAvatar = defaultAvatar;
    protected readonly ElementSize = ElementSize;
}