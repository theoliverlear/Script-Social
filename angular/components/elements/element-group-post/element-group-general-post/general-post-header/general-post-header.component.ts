import {Component} from "@angular/core";
import {defaultAvatar} from "../../../../../assets/imageAssets";
import {TagType} from "../../../../../models/html/TagType";
import {TargetType} from "../../../../../models/html/TargetType";
import {TextElementLink} from "../../../../../models/link/TextElementLink";

@Component({
    selector: 'general-post-header',
    templateUrl: './general-post-header.component.html',
    styleUrls: ['./general-post-header.component.css']
})
export class GeneralPostHeaderComponent {
    testElementLink: TextElementLink = new TextElementLink('#',
                                                           TargetType.SELF,
                                                           true,
                                                           'Oliver',
                                                           TagType.H5);
    constructor() {
        console.log('GeneralPostHeaderComponent loaded');
    }

    protected readonly defaultAvatar = defaultAvatar;
    protected readonly TagType = TagType;
}