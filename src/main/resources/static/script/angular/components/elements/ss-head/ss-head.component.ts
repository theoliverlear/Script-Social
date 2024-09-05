import {
    Component,
    Inject,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'ss-head',
    templateUrl: './ss-head.component.html'
})
export class HeadComponent implements OnChanges{
    static readonly DEFAULT_STYLESHEETS_PATHS: string[] = [
        // 'angular_build/styles.css'
    ];
    @Input() title: string;
    @Input() stylesheets: string[];
    constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
        console.log('HeadComponent loaded');
        HeadComponent.DEFAULT_STYLESHEETS_PATHS.forEach((path) => {
            console.log('Adding default stylesheet: ' + path);
            this.addStylesheet(path);
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['title']) {
            this.updateTitle();
        }
        if (changes['stylesheets']) {
            this.updateStylesheets();
        }
    }
    private updateTitle() {
        if (this.title) {
            console.log('Updating title: ' + this.title);
            this.document.title = this.title;
        }
    }
    private updateStylesheets() {
        console.log('Updating stylesheets: new list: ', this.stylesheets);
        this.clearExisting('link[data-dynamic]');
        if (this.stylesheets) {
            this.stylesheets.forEach((path) => {
                this.addStylesheet(path);
            });
        }
    }
    private addStylesheet(path: string) {
        const link = this.renderer.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        this.renderer.setAttribute(link, 'data-dynamic', '');
        this.renderer.appendChild(this.document.head, link);

        link.onerror = () => {
            console.error('Failed to load stylesheet: ' + path);
        }
    }
    private clearExisting(selector: string) {
        const existing = this.document.querySelectorAll(selector);
        existing.forEach((element) => {
            console.log('Removing existing element: ' + element);
            this.renderer.removeChild(this.document.head, element);
        });
    }
}