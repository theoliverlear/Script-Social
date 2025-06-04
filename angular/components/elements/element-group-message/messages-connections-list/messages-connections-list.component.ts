import {
    AfterViewInit,
    Component, EventEmitter, Output,
    QueryList,
    ViewChildren
} from "@angular/core";
import {
    ConnectionsListBubbleComponent
} from "../../element-group-connections/connections-list-bubble/connections-list-bubble.component";

@Component({
    selector: 'messages-connections-list',
    templateUrl: './messages-connections-list.component.html',
    styleUrls: ['./messages-connections-list.component.css']
})
export class MessagesConnectionsListComponent implements AfterViewInit {
    @ViewChildren(ConnectionsListBubbleComponent) connectionsListBubbles: QueryList<ConnectionsListBubbleComponent>;
    isAddConversationMode: boolean = false;
    constructor() {

    }
    toggleIsConversationMode() {
        this.isAddConversationMode = !this.isAddConversationMode;
    }
    toggleIsAddConversationMode() {
        this.connectionsListBubbles.forEach((bubble) => {
            bubble.isAddConversationMode = !bubble.isAddConversationMode;
            console.log(bubble);
        });
    }
    ngAfterViewInit() {
        this.subscribeToBubbleClickEvents();
    }
    subscribeToBubbleClickEvents() {
        this.connectionsListBubbles.forEach((bubble) => {
            bubble.clickEvent.subscribe(() => {
                this.deselectAllConnections();
                bubble.select();
            });
        });
    }
    deselectAllConnections(): void {
        this.connectionsListBubbles.forEach((bubble) => {
            bubble.deselect();
        });
    }
}