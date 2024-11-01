import {Component} from "@angular/core";

@Component({
    selector: 'connections-list-button',
    templateUrl: './connections-list-button.component.html',
    styleUrls: ['./connections-list-button-style.component.css']
})
export class ConnectionsListButtonComponent {
    constructor() {
        console.log('ConnectionsListButtonComponent loaded');
    }
}