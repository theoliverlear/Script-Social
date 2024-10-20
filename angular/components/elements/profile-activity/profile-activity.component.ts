import {Component} from "@angular/core";

@Component({
    selector: 'profile-activity',
    templateUrl: './profile-activity.component.html',
    styleUrls: ['./profile-activity-style.component.css']
})
export class ProfileActivityComponent {
    constructor() {
        console.log('ProfileActivityComponent loaded');
    }
}