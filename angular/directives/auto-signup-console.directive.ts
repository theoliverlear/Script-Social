import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";
import {ConsoleType} from "../components/elements/console/models/ConsoleType";
import {
    SignupConsoleHandlerDirective
} from "./signup-console-handler.directive";

@Directive({
    selector: '[autoSignupConsole]'
})
export class AutoSignupConsoleDirective {
    private _consoleType: ConsoleType;
    @Input() set autoSignupConsole(consoleType: ConsoleType) {
        this._consoleType = consoleType;
        this.updateView();
    }
    constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {
        console.log('AutoSignupConsoleDirective loaded');
    }
    private updateView() {
        this.viewContainer.clear();
        if (this._consoleType === ConsoleType.SIGNUP) {
            const view = this.viewContainer.createEmbeddedView(this.templateRef);
            const instance = view.rootNodes[0];
            const directive = new SignupConsoleHandlerDirective(instance);
            directive.ngOnInit();
        } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}