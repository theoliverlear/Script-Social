import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import {ImageAsset} from "../../../assets/imageAssets";


@Component({
    selector: 'ss-img',
    templateUrl: './ss-img.component.html',
    styleUrls: ['./ss-img-style.component.css']
})
export class SsImgComponent {
    @Input() imageAsset: ImageAsset;
    @Input() childId: string;
    @Input() childClass: string;
    @ViewChild('imageElement') imageElement: ElementRef;
    constructor() {
        console.log('SsImgComponent loaded');
    }
    addClassToImageElement(className: string) {
        this.imageElement.nativeElement.classList.add(className);
    }
}