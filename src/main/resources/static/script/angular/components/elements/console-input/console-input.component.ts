import {Component, Input} from "@angular/core";
import {ConsoleInputType} from "./models/ConsoleInputType";
import {ConsoleInputField} from "./models/ConsoleInputField";

@Component({
    selector: 'console-input',
    templateUrl: './console-input.component.html',
    styleUrls: ['./console-input-style.component.css']
})
export class ConsoleInputComponent {
    @Input() title: ConsoleInputField;
    @Input() type: ConsoleInputType;
    constructor() {
        console.log('ConsoleInputComponent loaded');
    }
}