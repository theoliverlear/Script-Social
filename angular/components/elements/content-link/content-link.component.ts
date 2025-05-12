import {Component, Input} from "@angular/core";
import {TextElementLink} from "../../../models/link/TextElementLink";

@Component({
    selector: 'content-link',
    templateUrl: './content-link.component.html',
    styleUrls: ['./content-link.component.css']
})
export class ContentLinkComponent {
    @Input() elementLink: TextElementLink;
    constructor() {
        console.log('ContentLinkComponent loaded');
    }
}