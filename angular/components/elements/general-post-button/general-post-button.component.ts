import {
    Component,
    ElementRef,
    Input,
    Renderer2,
    ViewChild
} from "@angular/core";
import {
    ImageAsset,
    likeIcon,
    whiteLikeIcon
} from "../../../assets/imageAssets";
import {GeneralPostButtonType} from "./models/GeneralPostButtonType";
import {SsImgComponent} from "../ss-img/ss-img.component";

@Component({
    selector: 'general-post-button',
    templateUrl: './general-post-button.component.html',
    styleUrls: ['./general-post-button-style.component.css']
})
export class GeneralPostButtonComponent {
    @Input() generalPostButtonType: GeneralPostButtonType;
    isClicked: boolean = false;
    @ViewChild(('buttonImage')) buttonImage: SsImgComponent;
    constructor(private renderer: Renderer2, private element: ElementRef) {
        console.log('GeneralPostButtonComponent loaded');
    }
    toggleClicked() {
        this.isClicked = !this.isClicked;
        if (this.isClicked) {
            this.renderer.addClass(this.element.nativeElement, 'clicked');
        } else {
            this.renderer.removeClass(this.element.nativeElement, 'clicked');
        }
        // this.buttonImage.imageAsset = this.toggleClickImageAsset();
    }
    getImageAsset(): ImageAsset {
        console.log('REACHED GET IMAGE ASSET');
        switch (this.generalPostButtonType) {
            case GeneralPostButtonType.LIKE:
                return whiteLikeIcon;
            default:
                return whiteLikeIcon;
        }
    }
    toggleClickImageAsset() {
        if (this.isClicked) {
            switch (this.generalPostButtonType) {
                case GeneralPostButtonType.LIKE:
                    return likeIcon;
                default:
                    return likeIcon;
            }
        } else {
            switch (this.generalPostButtonType) {
                case GeneralPostButtonType.LIKE:
                    return whiteLikeIcon;
                default:
                    return whiteLikeIcon;
            }
        }
    }
}