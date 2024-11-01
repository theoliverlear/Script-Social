import {Component} from "@angular/core";

@Component({
    selector: 'message-console',
    templateUrl: './message-console.component.html',
    styleUrls: ['./message-console-style.component.css']
})
export class MessageConsoleComponent {
    constructor() {
        console.log('MessageConsoleComponent loaded');
    }

}