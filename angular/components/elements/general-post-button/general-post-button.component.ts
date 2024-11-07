import {
    AfterViewInit,
    Component,
    ElementRef, EventEmitter,
    Input, Output,
    Renderer2,
    ViewChild
} from "@angular/core";
import {
    ImageAsset,
    likeIcon, whiteCloseIcon,
    whiteChatBubbleIcon,
    whiteLikeIcon,
    whiteReplyIcon,
    whiteRepostIcon,
    whiteShareIcon, whiteSendIcon, basicWhiteConfirmIcon
} from "../../../assets/imageAssets";
import {GeneralPostButtonType} from "./models/GeneralPostButtonType";
import {SsImgComponent} from "../ss-img/ss-img.component";
import {
    GeneralPostButtonClickResponse
} from "./models/GeneralPostButtonClickResponse";
import {ElementSize} from "../../../models/ElementSize";

@Component({
    selector: 'general-post-button',
    templateUrl: './general-post-button.component.html',
    styleUrls: ['./general-post-button-style.component.css']
})
export class GeneralPostButtonComponent implements AfterViewInit {
    @Input() buttonType: GeneralPostButtonType;
    @Input() clickResponse: GeneralPostButtonClickResponse;
    @Input() elementSize: ElementSize = ElementSize.MEDIUM;
    @Input() showNumberInteractions: boolean = true;
    @Output() buttonClicked: EventEmitter<void> = new EventEmitter();
    numInteractions: number = 0;
    isClicked: boolean = false;
    @ViewChild('buttonImage') buttonImage: SsImgComponent;
    constructor(private renderer: Renderer2, private element: ElementRef) {
        console.log('GeneralPostButtonComponent loaded');
    }
    emitButtonClicked() {
        this.buttonClicked.emit();
    }
    ngAfterViewInit() {
        if (this.clickResponse === GeneralPostButtonClickResponse.QUICK_RELEASE) {
            this.buttonImage.addClassToImageElement('quick-trigger');
        }
        this.applySizeStyle();
    }
    applySizeStyle() {
        switch (this.elementSize) {
            case ElementSize.SMALL:
                this.element.nativeElement.classList.add('small');
                break;
            case ElementSize.LARGE:
                this.element.nativeElement.classList.add('large');
                break;
        }
    }
    toggleClicked() {
        if (this.clickResponse === GeneralPostButtonClickResponse.TOGGLE) {
            this.isClicked = !this.isClicked;
            if (this.isClicked) {
                this.renderer.addClass(this.element.nativeElement, 'clicked');
            } else {
                this.renderer.removeClass(this.element.nativeElement, 'clicked');
            }
        }
    }
    getImageAsset(): ImageAsset {
        switch (this.buttonType) {
            case GeneralPostButtonType.LIKE:
                return whiteLikeIcon;
            case GeneralPostButtonType.COMMENT:
                return whiteReplyIcon;
            case GeneralPostButtonType.REPOST:
                return whiteRepostIcon;
            case GeneralPostButtonType.SHARE:
                return whiteShareIcon;
            case GeneralPostButtonType.CHAT:
                return whiteChatBubbleIcon;
            case GeneralPostButtonType.CANCEL:
                return whiteCloseIcon;
            case GeneralPostButtonType.SEND:
                return whiteSendIcon;
            case GeneralPostButtonType.CONFIRM:
                return basicWhiteConfirmIcon;
            default:
                return whiteLikeIcon;
        }
    }
    isQuickTrigger(): boolean {
        return this.clickResponse === GeneralPostButtonClickResponse.QUICK_RELEASE;
    }
    isNumberedButton(): boolean {
        switch (this.buttonType) {
            case GeneralPostButtonType.LIKE:
            case GeneralPostButtonType.COMMENT:
            case GeneralPostButtonType.REPOST:
                return true;
            default:
                return false;
        }
    }
    toggleClickImageAsset() {
        if (this.isClicked) {
            switch (this.buttonType) {
                case GeneralPostButtonType.LIKE:
                    return likeIcon;
                default:
                    return likeIcon;
            }
        } else {
            switch (this.buttonType) {
                case GeneralPostButtonType.LIKE:
                    return whiteLikeIcon;
                default:
                    return whiteLikeIcon;
            }
        }
    }
}