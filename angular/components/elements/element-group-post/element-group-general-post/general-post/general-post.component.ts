import {Component, Input, ViewChild} from "@angular/core";
import {defaultAvatar} from "../../../../../assets/imageAssets";
import {TagType} from "../../../../../models/html/TagType";
import {TargetType} from "../../../../../models/html/TargetType";
import {
    GeneralPostButtonType
} from "../general-post-button/models/GeneralPostButtonType";
import {
    GeneralPostFooterComponent
} from "../general-post-footer/general-post-footer.component";

@Component({
    selector: 'general-post',
    templateUrl: './general-post.component.html',
    styleUrls: ['./general-post.component.css']
})
export class GeneralPostComponent {
    @Input() postText: string;
    @Input() userId: number;
    @Input() postId: number;
    @Input() postedDate: Date;
    @ViewChild('generalPostFooter') generalPostFooter: GeneralPostFooterComponent;
    constructor() {

    }
    handleButtonClick(buttonType: GeneralPostButtonType) {
        switch (buttonType) {
            case GeneralPostButtonType.COMMENT:
                this.generalPostFooter.openCommentInput();
                break;
        }
    }
    protected readonly defaultAvatar = defaultAvatar;
    protected readonly TagType = TagType;
    protected readonly TargetType = TargetType;
}