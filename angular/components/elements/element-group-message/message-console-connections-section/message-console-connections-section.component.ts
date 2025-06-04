import {Component, QueryList, ViewChild, ViewChildren} from "@angular/core";
import {
    MessagesSectionTitle
} from "../messages-section-title/models/MessagesSectionTitle";
import {
    MessagesConnectionsListComponent
} from "../messages-connections-list/messages-connections-list.component";
import {
    ConnectionsListButtonComponent
} from "../../element-group-connections/connections-list-button/connections-list-button.component";
import {
    ConnectionsListButtonType
} from "../../element-group-connections/connections-list-button/models/ConnectionsListButtonType";

@Component({
    selector: 'message-console-connections-section',
    templateUrl: './message-console-connections-section.component.html',
    styleUrls: ['./message-console-connections-section.component.css']
})
export class MessageConsoleConnectionsSectionComponent {
    @ViewChild('confirmButton') confirmButton: ConnectionsListButtonComponent;
    @ViewChild('messageConnectionsList') messageConnectionsList: MessagesConnectionsListComponent;
    constructor() {

    }

    toggleConfirmButtonView() {
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