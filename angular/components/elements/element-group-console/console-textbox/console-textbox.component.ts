import {Component, EventEmitter, Output} from "@angular/core";
import {ButtonText} from "../../element-group-native/ss-button/models/ButtonText";
import {ButtonPosition} from "../../element-group-native/ss-button/models/ButtonPosition";

@Component({
    selector: 'console-textbox',
    templateUrl: './console-textbox.component.html',
    styleUrls: ['./console-textbox.component.css']
})
export class ConsoleTextboxComponent {
    @Output() textChanged: EventEmitter<string> = new EventEmitter();

    constructor() {
        console.log('ConsoleTextboxComponent loaded');
    }
    emitTextChange(text: string) {
        console.log('Text changed: ' + text);
        this.textChanged.emit(text);
    }
    protected readonly ButtonText = ButtonText;
    protected readonly ButtonPosition = ButtonPosition;
}