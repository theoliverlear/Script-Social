import {Communicative} from "./Communicative";

export class ClientMessage implements Communicative {
    userId: number;
    messageText: string;
    constructor(userId: number = 0,
        messageText: string = '') {
        this.userId = userId;
        this.messageText = messageText;
    }
}