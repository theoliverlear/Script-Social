import {Component, Input} from "@angular/core";
import {ElementSize} from "../models/ElementSize";
import {ButtonText} from "../ss-button/models/ButtonText";
import {ConsoleInputField} from "../console-input/models/ConsoleInputField";
import {ConsoleInputType} from "../console-input/models/ConsoleInputType";
import {ButtonPosition} from "../ss-button/models/ButtonPosition";
import {ConsoleType} from "./models/ConsoleType";
import { sendSignupToServer } from "../../../../new_scripts/globalScript";

@Component({
    selector: 'console',
    templateUrl: './console.component.html',
    styleUrls: ['./console-style.component.css']
})
export class ConsoleComponent {
    @Input() elementSize: ElementSize;
    @Input() consoleType: ConsoleType;
    email: string = '';
    username: string = '';
    password: string = '';
    confirmPassword: string = '';
    constructor() {
        console.log('ConsoleComponent loaded');
    }

    sendSignupToServer() {
        let signupApproved = sendSignupToServer(this.email, this.username, this.password);

    }
    protected readonly ConsoleInputType = ConsoleInputType;
    protected readonly ButtonText = ButtonText;
    protected readonly ElementSize = ElementSize;
    protected readonly ButtonPosition = ButtonPosition;
    protected readonly ConsoleInputField = ConsoleInputField;
}