import {Component} from "@angular/core";

@Component({
    selector: 'blinking-cursor',
    templateUrl: './blinking-cursor.component.html',
    styleUrls: ['./blinking-cursor.component.css']
})
export class BlinkingCursorComponent {
    constructor() {
        console.log('BlinkingCursorComponent loaded');
    }
}