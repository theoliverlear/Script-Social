import {Component} from "@angular/core";
import {ButtonPosition} from "../ss-button/models/ButtonPosition";
import {ButtonText} from "../ss-button/models/ButtonText";

@Component({
    selector: 'post-input-console',
    templateUrl: './post-input-console.component.html',
    styleUrls: ['./post-input-console.component.css']
})
export class PostInputConsoleComponent {
    constructor() {
        console.log('PostInputConsoleComponent loaded');
    }

    protected readonly ButtonPosition = ButtonPosition;
    protected readonly ButtonText = ButtonText;
}