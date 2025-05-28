import {Component, Input} from "@angular/core";

@Component({
    selector: 'profile-bio',
    templateUrl: './profile-bio.component.html',
    styleUrls: ['./profile-bio.component.css']
})
export class ProfileBioComponent {
    @Input() bioText: string;
    constructor() {
        console.log('ProfileBioComponent loaded');
    }
    hasBioText(): boolean {
        return this.bioText !== undefined && this.bioText !== '';
    }
}