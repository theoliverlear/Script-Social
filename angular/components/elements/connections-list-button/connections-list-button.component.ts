import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    ViewChild
} from "@angular/core";
import {addIcon, confirmIcon} from "../../../assets/imageAssets";
import {ConnectionsListButtonType} from "./models/ConnectionsListButtonType";
import {SsImgComponent} from "../ss-img/ss-img.component";

@Component({
    selector: 'connections-list-button',
    templateUrl: './connections-list-button.component.html',
    styleUrls: ['./connections-list-button-style.component.css']
})
export class ConnectionsListButtonComponent implements AfterViewInit {
    @Input() buttonType: ConnectionsListButtonType;
    @ViewChild('buttonImage') buttonImage: SsImgComponent;
    isClicked: boolean = false;
    constructor(private changeDetector: ChangeDetectorRef) {
        console.log('ConnectionsListButtonComponent loaded');
    }
    toggleClicked() {
        this.isClicked = !this.isClicked
    }
    ngAfterViewInit() {
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