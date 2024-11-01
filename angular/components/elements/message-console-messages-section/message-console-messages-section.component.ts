import {Component} from "@angular/core";
import {
    MessagesSectionTitles
} from "../messages-section-title/models/MessagesSectionTitles";

@Component({
    selector: 'message-console-messages-section',
    templateUrl: './message-console-messages-section.component.html',
    styleUrls: ['./message-console-messages-section-style.component.css']
})
export class MessageConsoleMessagesSectionComponent {
    constructor() {
        console.log('MessageConsoleMessagesSectionComponent loaded');
    }

    protected readonly MessagesSectionTitles = MessagesSectionTitles;
}