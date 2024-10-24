import {
    AfterContentInit,
    Component,
    ContentChild,
    ElementRef,
    Input
} from "@angular/core";
import {TagType} from "../../../models/html/TagType";
import {TargetType} from "../../../models/html/TargetType";

@Component({
    selector: 'ss-anchor',
    templateUrl: './ss-anchor.component.html',
    styleUrls: ['./ss-anchor-style.component.css']
})
export class SsAnchorComponent implements AfterContentInit {
    @Input() tagType: TagType = TagType.P;
    @Input() hrefLink: string = '';
    @Input() anchorText: string = '';
    @Input() targetType: TargetType = TargetType.SELF;
    hasContent: boolean = this.anchorText.length === 0;
    constructor() {
        console.log('SsAnchorComponent loaded');
    }
    navigateToLink(): void {
        window.location.href = this.hrefLink;
    }
    ngAfterContentInit() {
        // this.hasContent = this.content && this.content.nativeElement.hasChildNodes();
        console.log('Has Content: ', this.hasContent);
    }
    protected readonly TagType = TagType;
}