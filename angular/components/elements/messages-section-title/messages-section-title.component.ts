import {Component, Input} from "@angular/core";
import {MessagesSectionTitle} from "./models/MessagesSectionTitle";

@Component({
    selector: 'messages-section-title',
    templateUrl: './messages-section-title.component.html',
    styleUrls: ['./messages-section-title.component.css']
})
export class MessagesSectionTitleComponent {
    @Input() titleText: MessagesSectionTitle;
    constructor() {
        console.log('MessagesSectionTitleComponent loaded');
    }
}