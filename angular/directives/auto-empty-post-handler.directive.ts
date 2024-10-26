import {
    AfterContentInit,
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import {
    GeneralPostCommentInputComponent
} from "../components/elements/general-post-comment-input/general-post-comment-input.component";
import {EmptyPostService} from "../services/empty-post.service";
import {
    ConsolePostPopup
} from "../components/elements/general-post-comment/models/ConsolePostPopup";
import {EmptyPostHandlerDirective} from "./empty-post-handler.directive";

@Directive({
    selector: '[autoEmptyPostHandler]'
})
export class AutoEmptyPostHandlerDirective implements OnInit {
    commentInputComponent: GeneralPostCommentInputComponent;
    @Input() set autoEmptyPostHandler(commentInputComponent: GeneralPostCommentInputComponent) {
        this.commentInputComponent = commentInputComponent;
        this.ngOnInit();
        console.log('AutoEmptyPostHandlerDirective: autoEmptyPostPopup');
        console.log('AUTO EMPTY POST HANDLER DIRECTIVE');
        this.updateView();
    }
    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private emptyPostService: EmptyPostService
    ) {
        console.log('AutoEmptyPostHandlerDirective loaded');
    }
    ngOnInit() {
        console.log('AutoEmptyPostHandlerDirective: ngOnInit');
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
        if (this.commentInputComponent) {
            this.commentInputComponent.postPopupChange.subscribe((postPopup: ConsolePostPopup): void => {
                console.log('AutoEmptyPostHandlerDirective: setting up event listeners on GeneralPostCommentInputComponent');
                if (this.emptyPostService.isEmptyPost(postPopup)) {
                    this.emptyPostService.emitEmptyPost(postPopup);
                } else {
                    this.emptyPostService.emitEmptyPost(null);
                }
            });
        }
    }
    updateView(): void {
        this.viewContainer.clear();
        const view = this.viewContainer.createEmbeddedView(this.templateRef);
        const instance = view.rootNodes[0];
        const directive = new EmptyPostHandlerDirective(instance);
        directive.ngOnInit();
    }
}