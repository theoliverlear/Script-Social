import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    ViewChild
} from "@angular/core";
import {defaultAvatar, ImageAsset} from "../../../../assets/imageAssets";


@Component({
    selector: 'ss-img',
    templateUrl: './ss-img.component.html',
    styleUrls: ['./ss-img.component.css']
})
export class SsImgComponent implements AfterViewInit {
    @Input() imageAsset: ImageAsset = defaultAvatar;
    @Input() childId: string;
    @Input() childClass: string;
    @ViewChild('imageElement') imageElement: ElementRef;
    constructor(private changeDetector: ChangeDetectorRef) {
        console.log('SsImgComponent loaded');
    }
    ngAfterViewInit() {
        if (this.imageAsset.src === '') {
            this.imageAsset = defaultAvatar;
        }
        this.changeDetector.detectChanges();
    }
    addClassToImageElement(className: string) {
        this.imageElement.nativeElement.classList.add(className);
    }
}