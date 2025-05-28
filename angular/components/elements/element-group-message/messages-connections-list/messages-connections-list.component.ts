import {
    AfterViewInit,
    Component, EventEmitter, Output,
    QueryList,
    ViewChildren
} from "@angular/core";
import {
    ConnectionsListBubbleComponent
} from "../connections-list-bubble/connections-list-bubble.component";

@Component({
    selector: 'messages-connections-list',
    templateUrl: './messages-connections-list.component.html',
    styleUrls: ['./messages-connections-list.component.css']
})
export class MessagesConnectionsListComponent implements AfterViewInit {
    @ViewChildren(ConnectionsListBubbleComponent) connectionsListBubbles: QueryList<ConnectionsListBubbleComponent>;
    isAddConversationMode: boolean = false;
    constructor() {
        console.log('MessagesConnectionsListComponent loaded');
    }
    toggleIsConversationMode() {
        this.isAddConversationMode = !this.isAddConversationMode;
    }
    toggleIsAddConversationMode() {
        console.log('Toggling add conversation mode');
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