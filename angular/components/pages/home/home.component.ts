import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {ConsoleType} from "../../elements/element-group-console/console/models/ConsoleType";
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
import {Message} from "../../../models/message/Message";
import {
    BubbleTailSide
} from "../../elements/element-group-message/message-bubble/models/BubbleTailSide";
import {
    homeInviteSeniorDevMessageFadeInAnimation,
    homeRefactorMessageFadeInAnimation,
    promoCodeFadeInAnimation, tatianaRamosUserBubbleFadeInAnimation
} from "../../animations/animationProperties";
import {
    TypingTextComponent
} from "../../elements/element-group-text/typing-text/typing-text.component";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        fadeIn
    ]
})
export class HomeComponent implements AfterViewInit {
    homeRefactorMessage: Message = new Message(0, 'Mark Liliano', new Date(), homeMessageRefactorText);
    homeInviteSeniorDevMessage: Message = new Message(0, 'Colin Fredrickson', new Date(), homeMessageInviteSeniorDevText);
    @ViewChild('communicateYourCodeTypingText') communicateYourCodeTypingText: TypingTextComponent;
    constructor() {

    }
    ngAfterViewInit(): void {
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
    protected readonly tatianaRamosUserBubbleFadeInAnimation = tatianaRamosUserBubbleFadeInAnimation;
}