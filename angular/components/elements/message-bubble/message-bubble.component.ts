import {Component, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import {Message} from "../../../models/message/Message";
import {ElementSize} from "../../../models/ElementSize";
import {defaultAvatar, ImageAsset} from "../../../assets/imageAssets";
import {BubbleTailSide} from "./models/BubbleTailSide";

@Component({
    selector: 'message-bubble',
    templateUrl: './message-bubble.component.html',
    styleUrls: ['./message-bubble-style.component.css']
})
export class MessageBubbleComponent implements OnInit {
    @Input() message: Message;
    @Input() elementSize: ElementSize = ElementSize.MEDIUM;
    @Input() imageAsset: ImageAsset = defaultAvatar;
    @Input() tailSide: BubbleTailSide;
    constructor(private element: ElementRef,
                private renderer: Renderer2) {
        console.log('MessageBubbleComponent loaded');
    }
    isMediumSize(): boolean {
        return this.elementSize === ElementSize.MEDIUM;
    }
    isLargeSize(): boolean {
        return this.elementSize === ElementSize.LARGE;
    }
    getSizeClass(): string {
        return this.elementSize;
    }
    ngOnInit() {
        this.applyTailClass();
    }
    applyTailClass(): void {
        if (this.tailSide) {
            this.renderer.addClass(this.element.nativeElement, this.tailSide);
        }
    }
    protected readonly ElementSize = ElementSize;
}