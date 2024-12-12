import {
    Component,
} from "@angular/core";
import {
    MessagesWebSocketService
} from "../../../services/websocket/messages-websocket.service";
import {ClientMessage} from "../../../models/message/ClientMessage";

@Component({
    selector: 'message-console',
    templateUrl: './message-console.component.html',
    styleUrls: ['./message-console-style.component.css']
})
export class MessageConsoleComponent {
    constructor(private messagesWebsocketService: MessagesWebSocketService) {
        console.log('MessageConsoleComponent loaded');
    }

    sendMessageToServer() {
        const testMessageText = 'Hey'; // Somehow get the message text from the input field
        const testUserId = 1; // Somehow get the user id from the session
        this.messagesWebsocketService.send(new ClientMessage(testUserId, testMessageText));
    }
}