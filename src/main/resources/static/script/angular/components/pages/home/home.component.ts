import {Component} from "@angular/core";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home-style.component.css']
})
export class HomeComponent {
    title: string = 'Home | Script Social'
    stylesheets: string[] = [

        ]
    constructor() {
        console.log('HomeComponent loaded');
    }
}