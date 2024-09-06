import {Component} from "@angular/core";

@Component({
    selector: 'console-popup',
    templateUrl: './console-popup.component.html',
    styleUrls: ['./console-popup-style.component.css']
})
export class ConsolePopupComponent {
    constructor() {
        console.log('ConsolePopupComponent loaded');
    }
}