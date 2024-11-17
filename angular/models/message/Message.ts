import {Communicative} from "./Communicative";

export class Message implements Communicative {
    id: number;
    usersName: string;
    dateSent: Date;
    messageText: string;
    constructor(id: number = 0,
        usersName: string = '',
        dateSent: Date = new Date(),
        messageText: string = '') {
        this.id = id;
        this.usersName = usersName;
        this.dateSent = dateSent;
        this.messageText = messageText;
    }
}