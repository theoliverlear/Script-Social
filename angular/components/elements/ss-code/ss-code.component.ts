import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'ss-code',
    templateUrl: './ss-code.component.html',
    styleUrls: ['./ss-code-style.component.css'],
    preserveWhitespaces: false
})
export class SsCodeComponent {
    @Input() codeText: string;
    constructor() {
        console.log('SsCodeComponent loaded');
    }
}