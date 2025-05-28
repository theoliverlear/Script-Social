import {Component} from "@angular/core";
import {
    GeneralPostButtonType
} from "../../element-group-post/element-group-general-post/general-post-button/models/GeneralPostButtonType";
import {
    GeneralPostButtonClickResponse
} from "../../element-group-post/element-group-general-post/general-post-button/models/GeneralPostButtonClickResponse";

@Component({
    selector: 'user-choice-bubble-buttons',
    templateUrl: './user-choice-bubble-buttons.component.html',
    styleUrls: ['./user-choice-bubble-buttons.component.css']
})
export class UserChoiceBubbleButtonsComponent {
    constructor() {
        console.log('UserChoiceBubbleButtonsComponent loaded');
    }

    protected readonly GeneralPostButtonType = GeneralPostButtonType;
    protected readonly GeneralPostButtonClickResponse = GeneralPostButtonClickResponse;
}