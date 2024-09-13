import {Directive, Input, OnInit} from "@angular/core";
import {
    ConsoleComponent
} from "../components/elements/console/console.component";
import {FilledFieldsService} from "../services/filled-fields.service";
import {AuthPopup} from "../components/elements/models/auth/AuthPopup";

@Directive({
    selector: '[filledFieldsHandler]'
})
export class FilledFieldsHandlerDirective implements OnInit{
    @Input('filledFieldsHandler') consoleComponent: ConsoleComponent;
    constructor(private filledFieldsService: FilledFieldsService) {
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