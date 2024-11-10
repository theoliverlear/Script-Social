import {Component, ViewChild} from "@angular/core";
import {
    MessagesSectionTitle
} from "../messages-section-title/models/MessagesSectionTitle";
import {
    ConnectionsListButtonType
} from "../connections-list-button/models/ConnectionsListButtonType";
import {
    ConnectionsListButtonComponent
} from "../connections-list-button/connections-list-button.component";

@Component({
    selector: 'message-console-connections-section',
    templateUrl: './message-console-connections-section.component.html',
    styleUrls: ['./message-console-connections-section-style.component.css']
})
export class MessageConsoleConnectionsSectionComponent {
    @ViewChild('confirmButton') confirmButton: ConnectionsListButtonComponent;
    constructor() {
        console.log('MessageConsoleConnectionsSectionComponent loaded');
    }
    toggleConfirmButtonView() {
        console.log('Toggling confirm button view');
        this.confirmButton.toggleVisibility();
    }
    protected readonly MessagesSectionTitles = MessagesSectionTitle;
    protected readonly ConnectionsListButtonType = ConnectionsListButtonType;
}