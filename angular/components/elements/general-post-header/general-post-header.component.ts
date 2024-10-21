import {Component} from "@angular/core";
import {defaultAvatar} from "../../../assets/imageAssets";
import {TagType} from "../../../models/TagType";
import {TargetType} from "../../../models/TargetType";

@Component({
    selector: 'general-post-header',
    templateUrl: './general-post-header.component.html',
    styleUrls: ['./general-post-header-style.component.css']
})
export class GeneralPostHeaderComponent {
    constructor() {
        console.log('GeneralPostHeaderComponent loaded');
    }

    protected readonly defaultAvatar = defaultAvatar;
    protected readonly TagType = TagType;
    protected readonly TargetType = TargetType;
}