//=================================-Imports-==================================
import {hasProfilePictureFromServerById} from "../profileScript";
import {HtmlGenerative} from "./HtmlGenerative";

export class InstantMessage implements HtmlGenerative {
    //============================-Variables-=================================
    private _fullName: string;
    private _userId: number;
    private _message: string;
    private _timestamp: string;
    //===========================-Constructors-===============================
    constructor(fullName: string, userId: number, message: string, timestamp: string) {
        this._fullName = fullName;
        this._userId = userId;
        this._message = message;
        this._timestamp = timestamp;
    }
    //=============================-Methods-==================================

    //--------------------------Get-Html-String-------------------------------
    async getHtmlString(): Promise<string> {
        let hasProfilePicture: boolean = await hasProfilePictureFromServerById(this.userId);
        let imageSrc: string = '';
        let thymeleafImageSrc: string = '';
        if (hasProfilePicture) {
            imageSrc = `/profile/get/${this.userId}/profile-picture`;
            thymeleafImageSrc = `@{/profile/get/${this.userId}/profile-picture}`;
        } else {
            imageSrc = '\"../static/image/icon/default_avatar.svg\"';
            thymeleafImageSrc = `\"@{/image/icon/default_avatar.svg}\"`;
        }
        return `
        <div class="message-headline">
            <div class="image-with-name-div">
                <div class="message-img-div">
                    <img class="message-img" src=${imageSrc} alt="Default Avatar"
                         th:src=${thymeleafImageSrc}>
                </div>
                <div class="message-name-div">
                    <h6 class="message-name-text">${this.fullName}</h6>
                </div>
            </div>
            <div class="message-time-div">
                <p class="message-time-text">=${this.timestamp}</p>
            </div>
        </div>
        <div class="message-content">
            <p class="message-content-text">
                ${this._message}
            </p>
        </div>
        `;
    }
    //------------------------------Get-Html----------------------------------
    async getHtml(): Promise<HTMLDivElement> {
        let messageDiv: HTMLDivElement = document.createElement('div');
        messageDiv.classList.add('message-item');
        messageDiv.innerHTML = await this.getHtmlString();
        return messageDiv;
    }
    //=============================-Getters-==================================
    get fullName(): string {
        return this._fullName;
    }
    get userId(): number {
        return this._userId;
    }
    get message(): string {
        return this._message;
    }
    get timestamp(): string {
        return this._timestamp;
    }
    //=============================-Setters-==================================
    setFullName(fullName: string): void {
        this._fullName = fullName;
    }
    setUserId(userId: number): void {
        this._userId = userId;
    }
    setMessage(message: string): void {
        this._message = message;
    }
    setTimestamp(timestamp: string): void {
        this._timestamp = timestamp;
    }
}