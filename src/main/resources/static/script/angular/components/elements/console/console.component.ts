import {Component, Input} from "@angular/core";
import {ElementSize} from "../models/ElementSize";
import {ButtonText} from "../ss-button/models/ButtonText";
import {ConsoleInputField} from "../console-input/models/ConsoleInputField";
import {ConsoleInputType} from "../console-input/models/ConsoleInputType";
import {
    ButtonSize
} from "../../../../../../templates/angular_build/assets/script/angular/components/elements/ss-button/ButtonSize";
import {ButtonPosition} from "../ss-button/models/ButtonPosition";

@Component({
    selector: 'console',
    templateUrl: './console.component.html',
    styleUrls: ['./console-style.component.css']
})
export class ConsoleComponent {
    @Input() elementSize: ElementSize;
    constructor() {
        console.log('ConsoleComponent loaded');
    }

    protected readonly ConsoleInputType = ConsoleInputType;
    protected readonly ButtonText = ButtonText;
    protected readonly ElementSize = ElementSize;
    protected readonly ButtonPosition = ButtonPosition;
    protected readonly ConsoleInputField = ConsoleInputField;
}