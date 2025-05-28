import {Component, Input} from "@angular/core";
import {AuthPopup} from "../../../../models/auth/AuthPopup";
import {
    ConsolePostPopup
} from "../../element-group-post/element-group-general-post/general-post-comment/models/ConsolePostPopup";
import {ElementSize} from "../../../../models/ElementSize";

@Component({
    selector: 'console-popup',
    templateUrl: './console-popup.component.html',
    styleUrls: ['./console-popup.component.css']
})
export class ConsolePopupComponent {
    @Input() popup: AuthPopup | ConsolePostPopup;
    @Input() elementSize: ElementSize = ElementSize.MEDIUM;
    constructor() {
        console.log('ConsolePopupComponent loaded');
    }

    protected readonly ElementSize = ElementSize;
}