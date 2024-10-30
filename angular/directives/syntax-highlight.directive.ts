import {AfterViewInit, Directive, ElementRef, Renderer2} from "@angular/core";
import hljs from 'highlight.js';
@Directive({
    selector: '[syntaxHighlight]'
})
export class SyntaxHighlightDirective implements AfterViewInit {
    constructor(private element: ElementRef, private renderer: Renderer2) {
        console.log('SyntaxHighlightDirective loaded');
    }
    ngAfterViewInit() {
        this.highlight();
    }

    private highlight() {
        console.log('highlighting');
        if (!this.element.nativeElement) {
            console.log('no element found');
        }
        if (!(this.element.nativeElement instanceof HTMLElement)) {
            console.log('element not instance of HTMLElement');
        }
        const codeblock = this.element.nativeElement.querySelectorAll('code');
        console.log('number of code blocks: ', codeblock.length);
        codeblock.forEach((block: any) => {
            hljs.highlightElement(block);
            this.removeHighlightJsStyles(block);
            this.wrapLinesInDivs(block);
        });

        codeblock.forEach((block: any) => {
            // Remove 'hljs' class from the code element
            block.classList.remove('hljs');
            block.classList.remove('language-javascript');
            block.setAttribute('data-highlighted', 'no');
            hljs.highlightElement(block);
            this.removeHighlightJsStyles(block);
        });
    }
    private removeHighlightJsStyles(element: HTMLElement) {
        const highlightedSpans = element.querySelectorAll('span');
        highlightedSpans.forEach((span: HTMLElement) => {
            const classLists: string[] = Array.from(span.classList);
            classLists.forEach(classList => {
                if (classList.includes('_')) {
                    const refinedClass = classList.replace('_', '');
                    span.classList.remove(classList);
                    span.classList.add(refinedClass);
                }
                if (classList.startsWith('hljs-')) {
                    const refinedClass = classList.replace('hljs-', '');
                    span.classList.remove(classList);
                    span.classList.add(refinedClass);
                }
            });
        });
    }

    private wrapLinesInDivs(element: HTMLElement) {
        let lines = element.innerHTML.split('\n');
        element.innerHTML = lines.map(line => {
            const parts = line.split(/(<[^>]+>)/g);
            return parts.map(part => {
                if (part.startsWith('<') && part.endsWith('>')) {
                    return part;
                }
                return part.replace(/ /g, '&nbsp;');
            }).join('');
        }).map(line => `<div class="line">${line}</div>`).join('');
    }
}