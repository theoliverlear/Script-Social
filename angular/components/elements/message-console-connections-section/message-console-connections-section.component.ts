import {Component} from "@angular/core";
import {
    MessagesSectionTitles
} from "../messages-section-title/models/MessagesSectionTitles";

@Component({
    selector: 'message-console-connections-section',
    templateUrl: './message-console-connections-section.component.html',
    styleUrls: ['./message-console-connections-section-style.component.css']
})
export class MessageConsoleConnectionsSectionComponent {
    constructor() {
        console.log('MessageConsoleConnectionsSectionComponent loaded');
    }

    protected readonly MessagesSectionTitles = MessagesSectionTitles;
}