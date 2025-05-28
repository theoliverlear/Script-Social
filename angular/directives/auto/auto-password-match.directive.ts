import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';

import { PasswordMatchHandlerDirective } from '../validation/password-match-handler.directive';
import {ConsoleType} from "../../components/elements/element-group-console/console/models/ConsoleType";


@Directive({
    selector: '[autoPasswordMatch]'
})
export class AutoPasswordMatchDirective {
    @Input() set autoPasswordMatch(consoleType: ConsoleType) {
        this._consoleType = consoleType;
        this.updateView();
    }
    private _consoleType: ConsoleType;

    constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}

    private updateView(): void {
        this.viewContainer.clear();
        if (this._consoleType === ConsoleType.SIGNUP) {
            console.log('AutoPasswordMatchDirective: creating embedded view');
            // Create an embedded view of the template and attach the directive
            const view = this.viewContainer.createEmbeddedView(this.templateRef);
            const instance = view.rootNodes[0];
            const directive = new PasswordMatchHandlerDirective(instance);
            directive.ngOnInit();
        } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}