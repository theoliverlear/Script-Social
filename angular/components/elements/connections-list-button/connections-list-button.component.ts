import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component, EventEmitter, HostBinding, HostListener,
    Input, Output,
    ViewChild
} from "@angular/core";
import {addIcon, confirmIcon} from "../../../assets/imageAssets";
import {ConnectionsListButtonType} from "./models/ConnectionsListButtonType";
import {SsImgComponent} from "../ss-img/ss-img.component";
import {fadeAnimation, fixedFadeAnimation} from "../../animations/animations";
import {
    connectionsListButtonFadeInOutAnimation
} from "../../animations/animationProperties";

@Component({
    selector: 'connections-list-button',
    templateUrl: './connections-list-button.component.html',
    styleUrls: ['./connections-list-button.component.css'],
    animations: [fadeAnimation]
})
export class ConnectionsListButtonComponent implements AfterViewInit, AfterViewChecked {
    isVisible: boolean = true;
    @Output() clickEvent: EventEmitter<ConnectionsListButtonType> = new EventEmitter();
    @Input() buttonType: ConnectionsListButtonType;
    @ViewChild('buttonImage') buttonImage: SsImgComponent;
    isClicked: boolean = false;
    @HostBinding('@fade') get fadeAnimation() {
        return {
            value: this.isVisible ? 'visible' : 'hidden',
            params: {
                fadeInDuration: connectionsListButtonFadeInOutAnimation.fadeInDuration,
                fadeOutDuration: connectionsListButtonFadeInOutAnimation.fadeOutDuration
            }
        }
    }
    constructor(private changeDetector: ChangeDetectorRef) {
        console.log('ConnectionsListButtonComponent loaded');
    }
    @HostListener('click')
    handleClick() {
        this.clickEvent.emit(this.buttonType);
        this.toggleClicked();
        this.changeDetector.detectChanges();
    }
    toggleClicked() {
        this.isClicked = !this.isClicked
    }
    toggleVisibility() {
        this.isVisible = !this.isVisible
    }
    setImageAsset() {
        if (this.buttonImage) {
            switch (this.buttonType) {
                case ConnectionsListButtonType.ADD:
                    this.buttonImage.imageAsset = addIcon;
                    break;
                case ConnectionsListButtonType.CONFIRM:
                    this.buttonImage.imageAsset = confirmIcon;
                    break;
                default:
                    console.error('Invalid button type');
            }
            this.changeDetector.detectChanges();
        }
    }
    ngAfterViewInit() {
        this.setInitVisibility();
        this.setImageAsset();
        this.changeDetector.detectChanges();
    }
    setInitVisibility() {
        if (this.buttonType === ConnectionsListButtonType.CONFIRM) {
            this.isVisible = false;
            this.changeDetector.detectChanges();
        }
    }
    ngAfterViewChecked() {
        this.setImageAsset();
    }
}