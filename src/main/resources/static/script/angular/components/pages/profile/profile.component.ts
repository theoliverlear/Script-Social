import {Component} from "@angular/core";
import {defaultAvatar} from "../../assets/imageAssets";
import {
    HeadlineButtonType
} from "../../elements/headline-button/models/HeadlineButtonType";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile-style.component.css']
})
export class ProfileComponent {
    constructor() {
        console.log('ProfileComponent loaded');
    }

    protected readonly defaultAvatar = defaultAvatar;
    protected readonly HeadlineButtonType = HeadlineButtonType;
}