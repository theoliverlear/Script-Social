import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Renderer2,
    ViewChild
} from "@angular/core";
import {
    ImageAsset,
    likeIcon,
    whiteChatBubbleIcon,
    whiteLikeIcon, whiteReplyIcon,
    whiteRepostIcon,
    whiteShareIcon
} from "../../../assets/imageAssets";
import {GeneralPostButtonType} from "./models/GeneralPostButtonType";
import {SsImgComponent} from "../ss-img/ss-img.component";
import {
    GeneralPostButtonClickResponse
} from "./models/GeneralPostButtonClickResponse";

@Component({
    selector: 'general-post-button',
    templateUrl: './general-post-button.component.html',
    styleUrls: ['./general-post-button-style.component.css']
})
export class GeneralPostButtonComponent implements AfterViewInit {
    @Input() buttonType: GeneralPostButtonType;
    @Input() clickResponse: GeneralPostButtonClickResponse;
    numInteractions: number = 0;
    isClicked: boolean = false;
    @ViewChild(('buttonImage')) buttonImage: SsImgComponent;
    constructor(private renderer: Renderer2, private element: ElementRef) {
        console.log('GeneralPostButtonComponent loaded');
    }
    ngAfterViewInit() {
        if (this.clickResponse === GeneralPostButtonClickResponse.QUICK_TRIGGER) {
            this.buttonImage.addClassToImageElement('quick-trigger');
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
        // this.buttonImage.imageAsset = this.toggleClickImageAsset();
    }
    getImageAsset(): ImageAsset {
        console.log('REACHED GET IMAGE ASSET');
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
            default:
                return whiteLikeIcon;
        }
    }
    isQuickTrigger(): boolean {
        return this.clickResponse === GeneralPostButtonClickResponse.QUICK_TRIGGER;
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