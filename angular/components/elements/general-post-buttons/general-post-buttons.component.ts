import {Component} from "@angular/core";
import {
    GeneralPostButtonType
} from "../general-post-button/models/GeneralPostButtonType";
import {
    GeneralPostButtonClickResponse
} from "../general-post-button/models/GeneralPostButtonClickResponse";

@Component({
    selector: 'general-post-buttons',
    templateUrl: './general-post-buttons.component.html',
    styleUrls: ['./general-post-buttons-style.component.css']
})
export class GeneralPostButtonsComponent {
    // TODO: Create constant assets for buttons which hold their properties
    //       and simplifies embedded buttons' initialization.
    constructor() {
        console.log('GeneralPostButtonsComponent loaded');
    }

    protected readonly GeneralPostButtonType = GeneralPostButtonType;
    protected readonly GeneralPostButtonClickResponse = GeneralPostButtonClickResponse;
}