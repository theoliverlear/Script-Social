import {Component, Input} from "@angular/core";

@Component({
    selector: 'general-post',
    templateUrl: './general-post.component.html',
    styleUrls: ['./general-post-style.component.css']
})
export class GeneralPostComponent {
    @Input() postText: string;
    @Input() userId: number;
    @Input() postId: number;
    @Input() postedDate: Date;
    constructor(postText: string = '',
                userId: number = 0,
                postId: number = 0,
                postedDate: Date = new Date()) {
        console.log('GeneralPostComponent loaded');
    }
}