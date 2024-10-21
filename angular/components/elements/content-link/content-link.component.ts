import {Component, Input} from "@angular/core";
import {TargetType} from "../../../models/html/TargetType";
import {TagType} from "../../../models/html/TagType";

@Component({
    selector: 'content-link',
    templateUrl: './content-link.component.html',
    styleUrls: ['./content-link-style.component.css']
})
export class ContentLinkComponent {
    // TODO: Add a reusable model to prevent a huge inheritance attribute
    //       tree.
    @Input() tagType: TagType = TagType.H5;
    @Input() hrefLink: string = '';
    @Input() text: string = '';
    @Input() targetType: TargetType = TargetType.SELF;
    constructor() {
        console.log('ContentLinkComponent loaded');
    }
}