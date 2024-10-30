import {Component} from "@angular/core";

@Component({
    selector: 'message-bubble',
    templateUrl: './message-bubble.component.html',
    styleUrls: ['./message-bubble-style.component.css']
})
export class MessageBubbleComponent {
    constructor() {
        console.log('MessageBubbleComponent loaded');
    }
}