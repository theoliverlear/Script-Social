import {Component, Input} from "@angular/core";
import {Message} from "../../../../models/message/Message";

@Component({
    selector: 'messages-list',
    templateUrl: './messages-list.component.html',
    styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent {
    testMessage: Message = new Message(0,
                                       'Tatiana Ramos',
                                       new Date(),
                                       `Hey, I just wanted to loop you in on this away from the team. I want to make sure you are using JSDoc comments in your code.`);
    constructor() {

    }
}