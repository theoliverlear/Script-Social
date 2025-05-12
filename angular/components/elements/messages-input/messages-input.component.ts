import {Component} from "@angular/core";
import {
    GeneralPostButtonType
} from "../general-post-button/models/GeneralPostButtonType";
import {
    GeneralPostButtonClickResponse
} from "../general-post-button/models/GeneralPostButtonClickResponse";
import {ElementSize} from "../../../models/ElementSize";

@Component({
    selector: 'messages-input',
    templateUrl: './messages-input.component.html',
    styleUrls: ['./messages-input.component.css']
})
export class MessagesInputComponent {
    constructor() {
        console.log('MessagesInputComponent loaded');
    }
    sendMessageToServer() {

    }
    protected readonly GeneralPostButtonType = GeneralPostButtonType;
    protected readonly GeneralPostButtonClickResponse = GeneralPostButtonClickResponse;
    protected readonly ElementSize = ElementSize;
}