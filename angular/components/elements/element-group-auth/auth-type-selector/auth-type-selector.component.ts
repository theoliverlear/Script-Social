import {Component, EventEmitter, Output} from "@angular/core";
import {AuthType} from "../../../../models/auth/AuthType";

@Component({
    selector: 'auth-type-selector',
    templateUrl: './auth-type-selector.component.html',
    styleUrls: ['./auth-type-selector.component.css']
})
export class AuthTypeSelectorComponent {
    selectedAuthType: AuthType | null = AuthType.SIGNUP;
    @Output() authTypeChange: EventEmitter<AuthType> = new EventEmitter();
    constructor() {
        console.log('AuthTypeSelectorComponent loaded');
    }
    isSignupSelected(): boolean {
        return this.selectedAuthType === AuthType.SIGNUP;
    }
    isLoginSelected(): boolean {
        return this.selectedAuthType === AuthType.LOGIN;
    }
    selectAuthType(authType: AuthType): void {
        this.selectedAuthType = authType;
        this.authTypeChange.emit(authType);
    }
    protected readonly AuthType = AuthType;
}