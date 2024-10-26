import {Directive, HostListener, Inject, Input, OnInit} from "@angular/core";
import {
    EmptyPostService
} from "../services/empty-post.service";
import {
    GeneralPostCommentInputComponent
} from "../components/elements/general-post-comment-input/general-post-comment-input.component";
import {
    ConsolePostPopup
} from "../components/elements/general-post-comment/models/ConsolePostPopup";

@Directive({
    selector: '[emptyPostHandler]'
})
export class EmptyPostHandlerDirective implements OnInit {
    @Input('emptyPostHandler') postInputComponent: GeneralPostCommentInputComponent;
    constructor(private emptyPostHandlerService: EmptyPostService) {
        console.log('EmptyPostHandlerDirective loaded');
        console.log('EMPTY POST HANDLER DIRECTIVE');
    }
    @HostListener('click',['$event.target'])
    onClick(target: HTMLElement): void {
        console.log('EmptyPostHandlerDirective: onClick');
    }
    ngOnInit() {
        console.log('EmptyPostHandlerDirective: ngOnInit');
        if (this.postInputComponent) {
            console.log('EmptyPostHandlerDirective: setting up event listeners on GeneralPostCommentInputComponent');
            this.postInputComponent.postPopupChange.subscribe((postPopup: ConsolePostPopup): void => {
                console.log('EmptyPostHandlerDirective: postPopupChange');
                this.emptyPostHandlerService.emitEmptyPost(postPopup);
            });
        }
    }
}