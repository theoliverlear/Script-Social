import {Component} from "@angular/core";

@Component({
    selector: 'option-list',
    templateUrl: './option-list.component.html',
    styleUrls: ['./option-list-style.component.css']
})
export class OptionListComponent {
    constructor() {
        console.log('OptionListComponent loaded');
    }
}