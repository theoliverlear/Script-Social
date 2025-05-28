import {Component, Input} from "@angular/core";
import {AuthType} from "../../../../models/auth/AuthType";

@Component({
    selector: 'auth-bubble',
    templateUrl: './auth-bubble.component.html',
    styleUrls: ['./auth-bubble.component.css']
})
export class AuthBubbleComponent {
    @Input() authType: AuthType;

    constructor() {
        console.log('AuthBubbleComponent loaded');
    }
}