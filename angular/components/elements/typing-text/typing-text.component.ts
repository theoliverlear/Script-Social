import {
    AfterViewInit,
    Component,
    ElementRef,
    Input, Renderer2,
    ViewChild
} from "@angular/core";
import {TagType} from "../../../models/html/TagType";
import {TypeSpeed} from "../../../models/TypeSpeed";

@Component({
    selector: 'typing-text',
    templateUrl: './typing-text.component.html',
    styleUrls: ['./typing-text-style.component.css']
})
export class TypingTextComponent implements AfterViewInit {
    @Input() tagType: TagType;
    @Input() textToType: string;
    typedTextContent: string = '';
    @Input() typeSpeed: TypeSpeed = TypeSpeed.NORMAL;
    @Input() applyBeingTypedStyle: boolean = false;
    @Input() typeOnLoad: boolean = true;
    @ViewChild('typedText', {static: false}) typedText: ElementRef;
    constructor(private renderer: Renderer2) {
        console.log('TypingTextComponent loaded');
    }

    protected readonly TagType = TagType;
    ngAfterViewInit() {
        if (this.typeOnLoad) {
            this.typeText();
        }
    }
    async typeText(): Promise<void> {
        let element = this.typedText.nativeElement;
        if (this.applyBeingTypedStyle) {
            this.renderer.addClass(element, 'being-typed');
        }
        let currentCharIndex = 0;
        return new Promise((resolve) => {
            const typeChar = (): void => {
                if (currentCharIndex < this.textToType.length) {
                    element.textContent += this.textToType.charAt(currentCharIndex);
                    currentCharIndex++;
                    setTimeout(typeChar, this.typeSpeed);
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
    //--------------------------------Delete-Text---------------------------------
    async deleteText(): Promise<void> {
        let typeSpeed = this.typeSpeed;
        console.log('deleting text');
        let element = this.typedText.nativeElement;
        if (this.applyBeingTypedStyle) {
            element.classList.add('being-typed');
        }
        return new Promise((resolve): void => {
            function deleteChar(): void {
                if (element.textContent.length > 0) {
                    element.textContent = element.textContent.slice(0, -1);
                    setTimeout(deleteChar, typeSpeed);
                } else {
                    if (this.applyBeingTypedStyle) {
                        element.removeClass('being-typed');
                    }
                    resolve();
                }
            }
            deleteChar();
        });
    }
}