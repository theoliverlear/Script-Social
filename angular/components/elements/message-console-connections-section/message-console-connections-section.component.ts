import {Component, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {
    MessagesSectionTitle
} from "../messages-section-title/models/MessagesSectionTitle";
import {
    ConnectionsListButtonType
} from "../connections-list-button/models/ConnectionsListButtonType";
import {
    ConnectionsListButtonComponent
} from "../connections-list-button/connections-list-button.component";
import {
    MessagesConnectionsListComponent
} from "../messages-connections-list/messages-connections-list.component";

@Component({
    selector: 'message-console-connections-section',
    templateUrl: './message-console-connections-section.component.html',
    styleUrls: ['./message-console-connections-section-style.component.css']
})
export class MessageConsoleConnectionsSectionComponent {
    @ViewChild('confirmButton') confirmButton: ConnectionsListButtonComponent;
    @ViewChild('messageConnectionsList') messageConnectionsList: MessagesConnectionsListComponent;
    constructor() {
        console.log('MessageConsoleConnectionsSectionComponent loaded');
    }

    toggleConfirmButtonView() {
        console.log('Toggling confirm button view');
        this.confirmButton.toggleVisibility();
    }
    handleClick(buttonType: ConnectionsListButtonType) {
        switch (buttonType) {
            case ConnectionsListButtonType.ADD:
            case ConnectionsListButtonType.CONFIRM:
                this.toggleConfirmButtonView();
                this.messageConnectionsList.toggleIsAddConversationMode();
                break;
        }
    }
    protected readonly MessagesSectionTitle = MessagesSectionTitle;
    protected readonly ConnectionsListButtonType = ConnectionsListButtonType;
}