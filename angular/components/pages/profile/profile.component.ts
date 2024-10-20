import {Component, Input} from "@angular/core";
import {defaultAvatar} from "../../../assets/imageAssets";
import {
    HeadlineButtonType
} from "../../elements/headline-button/models/HeadlineButtonType";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile-style.component.css']
})
export class ProfileComponent {
    @Input() userId: number;
    constructor(userId: number = 0) {
        console.log('ProfileComponent loaded');
    }

    protected readonly defaultAvatar = defaultAvatar;
    protected readonly HeadlineButtonType = HeadlineButtonType;
}