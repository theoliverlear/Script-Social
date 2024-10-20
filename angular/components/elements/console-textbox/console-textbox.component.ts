import {Component} from "@angular/core";
import {ButtonText} from "../ss-button/models/ButtonText";
import {ButtonPosition} from "../ss-button/models/ButtonPosition";

@Component({
    selector: 'console-textbox',
    templateUrl: './console-textbox.component.html',
    styleUrls: ['./console-textbox-style.component.css']
})
export class ConsoleTextboxComponent {
    constructor() {
        console.log('ConsoleTextboxComponent loaded');
    }

    protected readonly ButtonText = ButtonText;
    protected readonly ButtonPosition = ButtonPosition;
}