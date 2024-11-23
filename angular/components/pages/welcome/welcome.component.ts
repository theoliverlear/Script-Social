import {Component} from "@angular/core";

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome-style.component.css']
})
export class WelcomeComponent {
    constructor() {
        console.log('WelcomeComponent loaded');
    }
}