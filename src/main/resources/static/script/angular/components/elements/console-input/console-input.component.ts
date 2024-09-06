import {
    AfterViewInit,
    Component, ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2
} from "@angular/core";
import {ConsoleInputType} from "./models/ConsoleInputType";
import {ConsoleInputField} from "./models/ConsoleInputField";

@Component({
    selector: 'console-input',
    templateUrl: './console-input.component.html',
    styleUrls: ['./console-input-style.component.css']
})
export class ConsoleInputComponent implements AfterViewInit {
    @Input() title: ConsoleInputField;
    @Input() type: ConsoleInputType;
    @Input() value: string = '';
    @Input() maxValue: number = 200;
    @Output() valueChange: EventEmitter<string> = new EventEmitter();
    private inputElement: HTMLInputElement | null = null;
    constructor(private renderer: Renderer2, private element: ElementRef) {
        console.log('ConsoleInputComponent loaded');
    }
    ngAfterViewInit() {
        this.inputElement = this.element.nativeElement.querySelector('input');
        if (this.inputElement) {
            this.updateMaxLengthIfApplicable();
        }
    }
    updateMaxLengthIfApplicable() {
        if (this.shouldHaveMaxLength()) {
            this.updateMaxLength();
        } else {
            this.renderer.removeAttribute(this.inputElement, 'maxlength');
        }
    }
    updateMaxLength() {
        this.renderer.setAttribute(this.inputElement, 'maxlength', this.maxValue.toString());
    }
    handleInputChange(newValue: string) {
        this.value = newValue;
        this.valueChange.emit(this.value);
        console.log('Input changed: ', this.value);
    }
    shouldHaveMaxLength(): boolean {
        return [
            ConsoleInputType.TEXT,
            ConsoleInputType.PASSWORD,
            ConsoleInputType.EMAIL
        ].includes(this.type);
    }

}