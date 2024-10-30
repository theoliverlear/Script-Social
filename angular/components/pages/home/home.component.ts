import {Component, OnInit} from "@angular/core";
import {ConsoleType} from "../../elements/console/models/ConsoleType";
import {TagType} from "../../../models/html/TagType";
import {scriptSocialLogoCropped} from "../../../assets/imageAssets";
import {TypeSpeed} from "../../../models/TypeSpeed";
import {ElementSize} from "../../../models/ElementSize";
import {
    scrollFadeInAnimation
} from "../../animations/animations";
import {originalCodeText} from "../../../assets/textAssets";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home-style.component.css'],
    animations: [
        scrollFadeInAnimation
    ]
})
export class HomeComponent implements OnInit {
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
    protected readonly originalCodeText = originalCodeText;
}