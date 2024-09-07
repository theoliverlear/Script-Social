import {
    AfterViewInit,
    Component,
    ElementRef,
    Input, Renderer2,
    ViewChild
} from "@angular/core";
import {TagType} from "../models/TagType";

@Component({
    selector: 'typable-text',
    templateUrl: './typable-text.component.html',
    styleUrls: ['./typable-text-style.component.css']
})
export class TypableTextComponent implements AfterViewInit {
    @Input() tagType: TagType;
    @Input() textToType: string;
    typedTextContent: string = '';
    @Input() textSpeed: number;
    @Input() applyBeingTypedStyle: boolean = false;
    @ViewChild('typedText', {static: false}) typedText: ElementRef;
    constructor(private renderer: Renderer2) {
        console.log('TypableTextComponent loaded');
    }

    protected readonly TagType = TagType;
    ngAfterViewInit() {
        this.typeText(this.typedText.nativeElement);
    }

    async typeText(
        element: HTMLElement,): Promise<void> {
        if (this.applyBeingTypedStyle) {
            this.renderer.addClass(element, 'being-typed');
        }
        let currentCharIndex = 0;
        return new Promise((resolve) => {
            const typeChar = (): void => {
                if (currentCharIndex < this.textToType.length) {
                    element.textContent += this.textToType.charAt(currentCharIndex);
                    currentCharIndex++;
                    setTimeout(typeChar, this.textSpeed);
                } else {
                    if (this.applyBeingTypedStyle) {
                        this.renderer.removeClass(element, 'being-typed');
                    }
                    resolve();
                }
            };
            typeChar();
        });
    }
}