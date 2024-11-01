import {Component, Input} from "@angular/core";
import {Message} from "../../../models/Message";

@Component({
    selector: 'message-bubble',
    templateUrl: './message-bubble.component.html',
    styleUrls: ['./message-bubble-style.component.css']
})
export class MessageBubbleComponent {
    @Input() message: Message;
    constructor() {
        console.log('MessageBubbleComponent loaded');
    }
}