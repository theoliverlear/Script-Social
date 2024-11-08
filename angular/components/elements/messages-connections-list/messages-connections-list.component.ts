import {
    AfterViewInit,
    Component,
    QueryList,
    ViewChildren
} from "@angular/core";
import {
    ConnectionsListBubbleComponent
} from "../connections-list-bubble/connections-list-bubble.component";

@Component({
    selector: 'messages-connections-list',
    templateUrl: './messages-connections-list.component.html',
    styleUrls: ['./messages-connections-list-style.component.css']
})
export class MessagesConnectionsListComponent implements AfterViewInit {
    @ViewChildren(ConnectionsListBubbleComponent) connectionsListBubbles: QueryList<ConnectionsListBubbleComponent>;
    constructor() {
        console.log('MessagesConnectionsListComponent loaded');
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