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