import {Component} from "@angular/core";

@Component({
    selector: 'console-textbox',
    templateUrl: './console-textbox.component.html',
    styleUrls: ['./console-textbox-style.component.css']
})
export class ConsoleTextboxComponent {
    constructor() {
        console.log('ConsoleTextboxComponent loaded');
    }
}