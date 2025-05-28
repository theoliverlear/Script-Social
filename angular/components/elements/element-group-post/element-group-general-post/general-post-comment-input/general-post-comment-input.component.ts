import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {
    GeneralPostButtonClickResponse
} from "../general-post-button/models/GeneralPostButtonClickResponse";
import {
    GeneralPostButtonType
} from "../general-post-button/models/GeneralPostButtonType";
import {ElementSize} from "../../../../../models/ElementSize";
import {PostService} from "../../../../../services/server/http/post.service";
import {
    ConsolePostPopup
} from "../general-post-comment/models/ConsolePostPopup";
import {EmptyPostService} from "../../../../../services/client/empty-post.service";
import {fixedFadeAnimation} from "../../../../animations/animations";

@Component({
    selector: 'general-post-comment-input',
    templateUrl: './general-post-comment-input.component.html',
    styleUrls: ['./general-post-comment-input.component.css'],
    animations: [
        fixedFadeAnimation
    ]
})
export class GeneralPostCommentInputComponent implements OnInit {
    @Input() isOpened: boolean = false;
    @Output() isOpenedChange: EventEmitter<boolean> = new EventEmitter();
    @Output() postPopupChange: EventEmitter<ConsolePostPopup> = new EventEmitter();
    postPopup: ConsolePostPopup | null = null;
    inputText: string = '';
    constructor(private postService: PostService,
                private emptyPostService: EmptyPostService) {
        console.log('GeneralPostCommentInputComponent loaded');
    }
    ngOnInit() {
        this.emptyPostService.emptyPost$.subscribe((postPopup: ConsolePostPopup): void => {
            this.postPopup = postPopup;
        });
    }

    sendPostToServer() {
        console.log('Sending post to server');
        let isEmptyPost = this.emptyPostService.isPostTextEmpty(this.inputText);
        console.log('isEmptyPost: ' + isEmptyPost);
        if (isEmptyPost) {
            this.postPopup = ConsolePostPopup.EMPTY;
            this.postPopupChange.emit(ConsolePostPopup.EMPTY);
        } else {
            // TODO: Create a setAndEmit() method.
            this.postPopup = null;
            this.postPopupChange.emit(null);
            // Sends the post to the server
        }
    }
    handleTextChange(text: string) {
        console.log('Text changed: ' + text);
        if (this.inputText.length < text.length) {
            this.postPopup = null;
            this.postPopupChange.emit(null);
        }
        this.inputText = text;
    }
    openCommentInput() {
        this.isOpened = true;
    }
    closeCommentInput() {
        this.isOpened = false;
        this.postPopup = null;
        this.postPopupChange.emit(null);
    }
    protected readonly GeneralPostButtonClickResponse = GeneralPostButtonClickResponse;
    protected readonly GeneralPostButtonType = GeneralPostButtonType;
    protected readonly ElementSize = ElementSize;
}