import {Component} from "@angular/core";

@Component({
    selector: 'welcome-banner',
    templateUrl: './welcome-banner.component.html',
    styleUrls: ['./welcome-banner.component.css']
})
export class WelcomeBannerComponent {
    constructor() {
        console.log('WelcomeBannerComponent loaded');
    }
}