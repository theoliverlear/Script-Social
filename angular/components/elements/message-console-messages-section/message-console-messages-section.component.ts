import {Component} from "@angular/core";
import {
    MessagesSectionTitle
} from "../messages-section-title/models/MessagesSectionTitle";

@Component({
    selector: 'message-console-messages-section',
    templateUrl: './message-console-messages-section.component.html',
    styleUrls: ['./message-console-messages-section-style.component.css']
})
export class MessageConsoleMessagesSectionComponent {
    constructor() {
        console.log('MessageConsoleMessagesSectionComponent loaded');
    }

    protected readonly MessagesSectionTitles = MessagesSectionTitle;
}