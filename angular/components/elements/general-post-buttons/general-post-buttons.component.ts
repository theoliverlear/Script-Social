import {Component} from "@angular/core";
import {
    GeneralPostButtonType
} from "../general-post-button/models/GeneralPostButtonType";

@Component({
    selector: 'general-post-buttons',
    templateUrl: './general-post-buttons.component.html',
    styleUrls: ['./general-post-buttons-style.component.css']
})
export class GeneralPostButtonsComponent {
    constructor() {
        console.log('GeneralPostButtonsComponent loaded');
    }

    protected readonly GeneralPostButtonType = GeneralPostButtonType;
}