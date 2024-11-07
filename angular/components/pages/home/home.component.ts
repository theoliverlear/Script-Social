import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {ConsoleType} from "../../elements/console/models/ConsoleType";
import {TagType} from "../../../models/html/TagType";
import {
    colinFredricksonPicture,
    markLilianoPicture,
    scriptSocialLogoCropped, tatianaRamosPicture
} from "../../../assets/imageAssets";
import {TypeSpeed} from "../../../models/TypeSpeed";
import {ElementSize} from "../../../models/ElementSize";
import {
    fadeIn
} from "../../animations/animations";
import {
    homeMessageInviteSeniorDevText,
    homeMessageRefactorText,
    originalCodeText
} from "../../../assets/textAssets";
import {Message} from "../../../models/Message";
import {
    BubbleTailSide
} from "../../elements/message-bubble/models/BubbleTailSide";
import {
    homeInviteSeniorDevMessageFadeInAnimation,
    homeRefactorMessageFadeInAnimation,
    promoCodeFadeInAnimation
} from "../../animations/animationProperties";
import {
    TypingTextComponent
} from "../../elements/typing-text/typing-text.component";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home-style.component.css'],
    animations: [
        fadeIn
    ]
})
export class HomeComponent implements AfterViewInit {
    homeRefactorMessage: Message = new Message(0, 'Mark Liliano', new Date(), homeMessageRefactorText);
    homeInviteSeniorDevMessage: Message = new Message(0, 'Colin Fredrickson', new Date(), homeMessageInviteSeniorDevText);
    @ViewChild('communicateYourCodeTypingText') communicateYourCodeTypingText: TypingTextComponent;
    constructor() {
        console.log('HomeComponent loaded');
    }
    ngAfterViewInit() {
        this.typeCommunicateYourCodeText();
    }
    typeCommunicateYourCodeText(): void {
        this.communicateYourCodeTypingText.typeTextWithDelay(1500);
    }
    protected readonly ConsoleType = ConsoleType;
    protected readonly TagType = TagType;
    protected readonly scriptSocialLogoCropped = scriptSocialLogoCropped;
    protected readonly TypeSpeed = TypeSpeed;
    protected readonly ElementSize = ElementSize;
    protected readonly originalCodeText = originalCodeText;
    protected readonly colinFredricksonPicture = colinFredricksonPicture;
    protected readonly markLilianoPicture = markLilianoPicture;
    protected readonly BubbleTailSide = BubbleTailSide;
    protected readonly promoCodeFadeInAnimation = promoCodeFadeInAnimation;
    protected readonly homeRefactorMessageFadeInAnimation = homeRefactorMessageFadeInAnimation;
    protected readonly homeInviteSeniorDevMessageFadeInAnimation = homeInviteSeniorDevMessageFadeInAnimation;
    protected readonly tatianaRamosPicture = tatianaRamosPicture;
}