import {Component} from "@angular/core";

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages-style.component.css']
})
export class MessagesComponent {
    constructor() {
        console.log('MessagesComponent loaded');
    }
}