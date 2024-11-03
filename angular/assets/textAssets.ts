export const originalCodeText = `
export class AccountPage {
    private _usersName: string;
    private _usersEmail: string;
    private _usersPhoneNumber: string;
    
    constructor(usersName: string,
                usersEmail: string,
                usersPhoneNumber: string) {
        this._usersName = usersName;
        this._usersEmail = usersEmail;
        this._usersPhoneNumber = usersPhoneNumber;
    }
    getHtml(): HTMLElement {
        ...
    }
}
`;
export const angularCodeText = `
import {Component, Input} from "@angular/core";
@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page-style.component.css']
})
...
`;
export const homeMessageRefactorText = `
I like the code, but you can do this in Angular. Let me show you how.
`;
export const homeMessageInviteSeniorDevText = `
I'll get our senior dev linked in on this chat and see what they they think.
`;