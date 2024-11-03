import {Component, OnInit} from "@angular/core";
import {ConsoleType} from "../../elements/console/models/ConsoleType";
import {TagType} from "../../../models/html/TagType";
import {
    colinFredricksonPicture,
    markLilianoPicture,
    scriptSocialLogoCropped
} from "../../../assets/imageAssets";
import {TypeSpeed} from "../../../models/TypeSpeed";
import {ElementSize} from "../../../models/ElementSize";
import {
    scrollFadeInAnimation
} from "../../animations/animations";
import {
    homeMessageInviteSeniorDevText,
    homeMessageRefactorText,
    originalCodeText
} from "../../../assets/textAssets";
import {Message} from "../../../models/Message";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home-style.component.css'],
    animations: [
        scrollFadeInAnimation
    ]
})
export class HomeComponent implements OnInit {
    homeRefactorMessage: Message = new Message(0, 'Mark Liliano', new Date(), homeMessageRefactorText);
    homeInviteSeniorDevMessage: Message = new Message(0, 'Colin Fredrickson', new Date(), homeMessageInviteSeniorDevText);
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
    protected readonly colinFredricksonPicture = colinFredricksonPicture;
    protected readonly markLilianoPicture = markLilianoPicture;
}