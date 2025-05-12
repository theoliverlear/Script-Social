import {Component, Input} from "@angular/core";
import {
    GeneralPostButtonClickResponse
} from "../general-post-button/models/GeneralPostButtonClickResponse";
import {
    GeneralPostButtonType
} from "../general-post-button/models/GeneralPostButtonType";
import {ImageAsset} from "../../../assets/imageAssets";

@Component({
    selector: 'user-choice-bubble',
    templateUrl: './user-choice-bubble.component.html',
    styleUrls: ['./user-choice-bubble.component.css']
})
export class UserChoiceBubbleComponent {
    @Input() imageAsset: ImageAsset;
    @Input() usersName: string;
    constructor() {
        console.log('UserChoiceBubbleComponent loaded');
    }

    protected readonly GeneralPostButtonClickResponse = GeneralPostButtonClickResponse;
    protected readonly GeneralPostButtonType = GeneralPostButtonType;
}