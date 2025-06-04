import {Component, Input} from "@angular/core";
import {HeadlineButtonType} from "./models/HeadlineButtonType";

@Component({
    selector: 'headline-button',
    templateUrl: './headline-button.component.html',
    styleUrls: ['./headline-button.component.css']
})
export class HeadlineButtonComponent {
    @Input() headlineButtonType: HeadlineButtonType;
    constructor() {
        console.log('HeadlineButtonComponent loaded');
    }
}