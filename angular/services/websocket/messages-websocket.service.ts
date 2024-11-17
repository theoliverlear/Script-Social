import {Injectable} from "@angular/core";
import {Message} from "../../models/message/Message";
import {WebSocketService} from "./websocket.service";
import {Communicative} from "../../models/message/Communicative";

@Injectable({
    providedIn: 'root'
})
export class MessagesWebSocketService extends WebSocketService<Communicative> {
    static readonly URL: string = '/messages/receiver';
    constructor() {
        super(MessagesWebSocketService.URL);
        console.log('MessagesWebsocketService created');
    }
    onReceive(frame: any): void {
        let messageJson: any = JSON.parse(frame.body);
        const messageId: number = messageJson.id;
        const usersName: string = messageJson.usersName;
        const dateSent: Date = new Date(messageJson.dateSent);
        const messageText: string = messageJson.messageText;
        const message: Message = new Message(messageId, usersName, dateSent, messageText);
        this.contentSubject.next(message);
    }
}