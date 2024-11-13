import {Component, Input} from "@angular/core";
import {Message} from "../../../models/message/Message";

@Component({
    selector: 'messages-list',
    templateUrl: './messages-list.component.html',
    styleUrls: ['./messages-list-style.component.css']
})
export class MessagesListComponent {
    testMessage: Message = new Message(0,
                                       'John Doe',
                                       new Date(),
                                       `Yo Mista White. I see you got the
                                        semicolons bitch. Finally, you stopped
                                        the errors, like, computationally.
                                        That's like, science, Mista White.`);
    constructor() {
        console.log('MessagesListComponent loaded');
    }
}