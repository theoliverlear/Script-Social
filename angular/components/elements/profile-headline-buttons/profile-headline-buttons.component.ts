import {Component} from "@angular/core";
import {
    HeadlineButtonType
} from "../headline-button/models/HeadlineButtonType";

@Component({
    selector: 'profile-headline-buttons',
    templateUrl: './profile-headline-buttons.component.html',
    styleUrls: ['./profile-headline-buttons.component.css']
})
export class ProfileHeadlineButtonsComponent {
    constructor() {
        console.log('ProfileHeadlineButtonsComponent loaded');
    }

    protected readonly HeadlineButtonType = HeadlineButtonType;
}