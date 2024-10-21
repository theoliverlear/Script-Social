import {Component, Input} from "@angular/core";
import {defaultAvatar} from "../../../assets/imageAssets";
import {TagType} from "../../../models/html/TagType";
import {TargetType} from "../../../models/html/TargetType";

@Component({
    selector: 'general-post',
    templateUrl: './general-post.component.html',
    styleUrls: ['./general-post-style.component.css']
})
export class GeneralPostComponent {
    @Input() postText: string;
    @Input() userId: number;
    @Input() postId: number;
    @Input() postedDate: Date;
    constructor() {
        console.log('GeneralPostComponent loaded');
    }

    protected readonly defaultAvatar = defaultAvatar;
    protected readonly TagType = TagType;
    protected readonly TargetType = TargetType;
}