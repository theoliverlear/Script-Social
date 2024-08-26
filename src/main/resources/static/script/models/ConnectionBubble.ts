import {HtmlGenerative} from "./HtmlGenerative";
import {
    getProfilePictureSrcByUsername,
    getThymeleafImageSrc
} from "../globalScript";

export class ConnectionBubble implements HtmlGenerative {
    private _username: string;
    constructor(username: string) {
        this._username = username;
    }
    async getHtmlString(): Promise<string> {
        let profilePictureSrc: string = await getProfilePictureSrcByUsername(this._username);
        let thymeleafImageSrc: string = getThymeleafImageSrc(profilePictureSrc);
        return `
            <div class="connection-img-div">
                <img class="connection-img" src="${profilePictureSrc}" alt="Default Avatar"
                     th:src="${thymeleafImageSrc}">
            </div>
            <div class="connection-name-div">
                <h6 class="connection-name-text">${this._username}</h6>
            </div>
        `;
    }
    async getHtml(): Promise<HTMLDivElement> {
        let connectionBubbleDiv: HTMLDivElement = document.createElement('div');
        connectionBubbleDiv.classList.add('connection-item', 'connection');
        connectionBubbleDiv.innerHTML = await this.getHtmlString();
        return connectionBubbleDiv;
    }
    get username(): string {
        return this._username;
    }
}