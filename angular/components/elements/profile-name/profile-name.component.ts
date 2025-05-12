import {Component, Input} from "@angular/core";

@Component({
    selector: 'profile-name',
    templateUrl: './profile-name.component.html',
    styleUrls: ['./profile-name.component.css']
})
export class ProfileNameComponent {
    @Input() nameText: string;
    constructor() {
        console.log('ProfileNameComponent loaded');
    }
}