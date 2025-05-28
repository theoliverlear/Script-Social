import {Component} from "@angular/core";

@Component({
    selector: 'option-bubble',
    templateUrl: './option-bubble.component.html',
    styleUrls: ['./option-bubble.component.css']
})
export class OptionBubbleComponent {
    constructor() {
        console.log('OptionBubbleComponent loaded');
    }
}