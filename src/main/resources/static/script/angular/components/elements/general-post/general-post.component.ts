import {Component, Input} from "@angular/core";

@Component({
    selector: 'general-post',
    templateUrl: './general-post.component.html',
    styleUrls: ['./general-post-style.component.css']
})
export class GeneralPostComponent {
    @Input() postText: string;
    constructor() {
        console.log('GeneralPostComponent loaded');
    }
}