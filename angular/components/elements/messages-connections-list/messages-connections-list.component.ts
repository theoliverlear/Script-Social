import {Component} from "@angular/core";
import {User} from "../../../models/user/User";

@Component({
    selector: 'messages-connections-list',
    templateUrl: './messages-connections-list.component.html',
    styleUrls: ['./messages-connections-list-style.component.css']
})
export class MessagesConnectionsListComponent {
    // connectionsList: User[];
    constructor() {
        console.log('MessagesConnectionsListComponent loaded');
    }
}