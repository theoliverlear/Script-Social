import {Component, Input} from "@angular/core";

@Component({
    selector: 'connections-list-bubble',
    templateUrl: './connections-list-bubble.component.html',
    styleUrls: ['./connections-list-bubble-style.component.css']
})
export class ConnectionsListBubbleComponent {
    @Input() connectionName: string;
    constructor() {
        console.log('ConnectionsListBubbleComponent loaded');
    }
}