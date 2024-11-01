import {Component} from "@angular/core";
import {
    MessagesSectionTitle
} from "../messages-section-title/models/MessagesSectionTitle";

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
}