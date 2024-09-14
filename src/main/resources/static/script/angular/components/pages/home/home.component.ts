import {Component, OnInit} from "@angular/core";
import {ConsoleType} from "../../elements/console/models/ConsoleType";
import {TagType} from "../../elements/models/TagType";
import {scriptSocialLogoCropped} from "../../assets/imageAssets";
import {TypeSpeed} from "../../elements/models/TypeSpeed";
import {ElementSize} from "../../elements/models/ElementSize";

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
    protected readonly scriptSocialLogoCropped = scriptSocialLogoCropped;
    protected readonly TypeSpeed = TypeSpeed;
    protected readonly ElementSize = ElementSize;
}