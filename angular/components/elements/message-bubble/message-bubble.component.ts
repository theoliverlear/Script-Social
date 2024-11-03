import {Component, Input} from "@angular/core";
import {Message} from "../../../models/Message";
import {ElementSize} from "../../../models/ElementSize";
import {defaultAvatar, ImageAsset} from "../../../assets/imageAssets";

@Component({
    selector: 'message-bubble',
    templateUrl: './message-bubble.component.html',
    styleUrls: ['./message-bubble-style.component.css']
})
export class MessageBubbleComponent {
    @Input() message: Message;
    @Input() elementSize: ElementSize = ElementSize.MEDIUM;
    @Input() imageAsset: ImageAsset = defaultAvatar;
    constructor() {
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
    protected readonly ElementSize = ElementSize;
}