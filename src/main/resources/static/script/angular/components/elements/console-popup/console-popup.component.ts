import {Component, Input} from "@angular/core";
import {AuthPopup} from "../models/auth/AuthPopup";

@Component({
    selector: 'console-popup',
    templateUrl: './console-popup.component.html',
    styleUrls: ['./console-popup-style.component.css']
})
export class ConsolePopupComponent {
    @Input() authPopup: AuthPopup;
    constructor() {
        console.log('ConsolePopupComponent loaded');
    }
}