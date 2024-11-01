import {Component} from "@angular/core";

@Component({
    selector: 'messages-input',
    templateUrl: './messages-input.component.html',
    styleUrls: ['./messages-input-style.component.css']
})
export class MessagesInputComponent {
    constructor() {
        console.log('MessagesInputComponent loaded');
    }
}