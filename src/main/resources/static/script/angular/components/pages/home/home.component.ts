import {Component, OnInit} from "@angular/core";
import {ConsoleType} from "../../elements/console/models/ConsoleType";
import {TagType} from "../../elements/models/TagType";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home-style.component.css']
})
export class HomeComponent implements OnInit {
    title: string = 'Home | Script Social';

    stylesheets: string[] = [

        ];
    constructor() {
        console.log('HomeComponent loaded');
    }
    ngOnInit() {

    }

    protected readonly ConsoleType = ConsoleType;
    protected readonly TagType = TagType;
}