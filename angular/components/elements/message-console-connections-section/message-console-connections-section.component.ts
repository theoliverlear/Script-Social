import {Component} from "@angular/core";
import {
    MessagesSectionTitle
} from "../messages-section-title/models/MessagesSectionTitle";
import {
    ConnectionsListButtonType
} from "../connections-list-button/models/ConnectionsListButtonType";

@Component({
    selector: 'message-console-connections-section',
    templateUrl: './message-console-connections-section.component.html',
    styleUrls: ['./message-console-connections-section-style.component.css']
})
export class MessageConsoleConnectionsSectionComponent {
    constructor() {
        console.log('MessageConsoleConnectionsSectionComponent loaded');
    }

    protected readonly MessagesSectionTitles = MessagesSectionTitle;
    protected readonly ConnectionsListButtonType = ConnectionsListButtonType;
}