import {Component} from "@angular/core";

@Component({
    selector: 'option-list',
    templateUrl: './options-list.component.html',
    styleUrls: ['./options-list-style.component.css']
})
export class OptionsListComponent {
    constructor() {
        console.log('OptionListComponent loaded');
    }
}