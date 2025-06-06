import {Directive, Inject, Input, OnInit} from "@angular/core";
import {
    ConsoleComponent
} from "../../components/elements/element-group-console/console/console.component";
import {FilledFieldsService} from "../../services/client/filled-fields.service";
import {AuthPopup} from "../../models/auth/AuthPopup";

@Directive({
    selector: '[filledFieldsHandler]'
})
export class FilledFieldsHandlerDirective implements OnInit{
    constructor(private filledFieldsService: FilledFieldsService,
                @Inject(ConsoleComponent) private consoleComponent: ConsoleComponent) {
        console.log('FilledFieldsHandlerDirective loaded');
    }
    ngOnInit() {
        console.log('FilledFieldsHandlerDirective: ngOnInit');
        if (this.consoleComponent) {
            console.log('FilledFieldsHandlerDirective: setting up event listeners on ConsoleComponent');
            this.consoleComponent.filledFields.subscribe((field: string): void => {
                let isFilledField = this.filledFieldsService.isFilledField(field);
                let authPopup = isFilledField ? null : AuthPopup.FILL_ALL_FIELDS;
                this.filledFieldsService.emitFilledFields(authPopup);
            });
        }
    }
}