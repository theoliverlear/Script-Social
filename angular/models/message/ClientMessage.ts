export class ClientMessage {
    userId: number;
    messageText: string;
    constructor(userId: number = 0,
        messageText: string = '') {
        this.userId = userId;
        this.messageText = messageText;
    }
}