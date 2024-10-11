//=================================-Imports-==================================
import {AuthType} from "./models/AuthType";
import {
    clearInputs,
    getCurrentUserIdFromServer, hasEmptyInputs, hashPassword,
    loadPage,
    removeTextArtifacts
} from "./globalScript";
import {AuthPopup} from "./models/AuthPopup";
//================================-Variables-=================================

//-----------------------------------Cache------------------------------------
let currentAuthType: AuthType = AuthType.SIGNUP;
//------------------------------Auth-Containers-------------------------------
let signupDiv: JQuery<HTMLElement> = $('#signup-div');
let loginDiv: JQuery<HTMLElement> = $('#login-div');
//-----------------------------Auth-Type-Buttons------------------------------
let signupButton: JQuery<HTMLElement> = $('#signup-button');
let loginButton: JQuery<HTMLElement> = $('#login-button');
let authTypeButtons: JQuery<HTMLElement> = $('.auth-type-button');
//-------------------------------Signup-Inputs--------------------------------
let signupPasswordInputs: JQuery<HTMLElement> = $('.signup-password-inputs');
let signupEmailInput: JQuery<HTMLElement> = $('#signup-email-input');
let signupUsernameInput: JQuery<HTMLElement> = $('#signup-username-input');
let signupPasswordInput: JQuery<HTMLElement> = $('#signup-password-input');
let signupConfirmPasswordInput: JQuery<HTMLElement> = $('#signup-confirm-password-input');
//-----------------------------------Popup------------------------------------
let popupDiv: JQuery<HTMLElement> = $('#popup-div');
let popupText: JQuery<HTMLElement> = $('#popup-text');
//------------------------------Confirm-Buttons-------------------------------
let confirmButtons: JQuery<HTMLElement> = $('.confirm-button');
let confirmLoginButton: JQuery<HTMLElement> = $('#confirm-login-button');
let confirmSignupButton: JQuery<HTMLElement> = $('#confirm-signup-button');
//--------------------------------Login-Inputs--------------------------------
let loginUsernameInput: JQuery<HTMLElement> = $('#login-username-input');
let loginPasswordInput: JQuery<HTMLElement> = $('#login-password-input');
//------------------------------Input-Containers------------------------------
let signupInputs: JQuery<HTMLElement>[] = [signupEmailInput, signupUsernameInput, signupPasswordInput, signupConfirmPasswordInput];
let loginInputs: JQuery<HTMLElement>[] = [loginUsernameInput, loginPasswordInput];
//=============================-Server-Functions-=============================

//----------------------------Send-Signup-Request-----------------------------
async function sendSignupRequest(): Promise<void> {
    let hashedPassword: string = hashPassword(signupPasswordInput.val() as string);
    let response: void | Response = await fetch('/authorize/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: signupEmailInput.val(),
            username: signupUsernameInput.val(),
            password: hashedPassword
        })
    }).catch((error): void => {
        console.error('Error: ', error);
    });
    if (response) {
        if (response.ok) {
            let responseJson = await response.json();
            let isAuthorized: boolean = responseJson.authorized;
            if (isAuthorized) {
                window.location.href = '/welcome/';
            } else {
                popupDiv.fadeIn(100);
                popupText.text(AuthPopup.USERNAME_OR_EMAIL_EXISTS);
            }
        }
    }
}
//-----------------------------Send-Login-Request-----------------------------
async function sendLoginRequest(): Promise<void> {
    let hashedPassword: string = hashPassword(loginPasswordInput.val() as string);
    let response: void | Response  = await fetch('/authorize/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: loginUsernameInput.val(),
            password: hashedPassword
        })
    }).catch((error): void => {
        console.error('Error: ', error);
    });
    if (response) {
        if (response.ok) {
            let responseJson = await response.json();
            let isAuthorized: boolean = responseJson.authorized;
            if (isAuthorized) {
                let isWelcomeCompleted: boolean = Boolean(responseJson.completedWelcome);
                console.log('responseJson: ', responseJson);
                console.log(responseJson.completedWelcome);
                console.log('isWelcomeCompleted: ', isWelcomeCompleted);
                if (!isWelcomeCompleted) {
                    window.location.href = '/welcome/';
                } else {
                    let currentUser: number = await getCurrentUserIdFromServer();
                    if (currentUser) {
                        window.location.href = '/profile/' + currentUser;
                    }
                }
            } else {
                showPopupDivMessage(AuthPopup.INVALID_USERNAME_OR_PASSWORD);
            }
        }
    }
}
//-----------------------------Send-Auth-Request------------------------------
async function sendAuthRequest(): Promise<void> {
    if (currentAuthType === AuthType.SIGNUP) {
        if (hasEmptyInputs(signupInputs)) {
            popupDiv.fadeIn(100);
            popupText.text(AuthPopup.FILL_ALL_FIELDS);
        } else if (!passwordsMatch()) {
            popupDiv.fadeIn(100);
            popupText.text(AuthPopup.PASSWORDS_DONT_MATCH);
        } else {
            await sendSignupRequest();
        }
    } else if (currentAuthType === AuthType.LOGIN) {
        if (hasEmptyInputs(loginInputs)) {
            popupDiv.fadeIn(100);
            popupText.text(AuthPopup.FILL_ALL_FIELDS);
        } else {
            await sendLoginRequest();
        }
    }
}
//=============================-Client-Functions-=============================

//--------------------------Apply-Select-Type-Style---------------------------
function applySelectTypeStyle(): void {
    let clickedElementId = this.id;
    if (clickedElementId === 'signup-button' && currentAuthType !== AuthType.SIGNUP) {
        currentAuthType = AuthType.SIGNUP;
        deselectAuthBubble(loginButton);
        selectAuthBubble(signupButton);
        loginDiv.hide();
        signupDiv.fadeIn('fast', function(): void {
            signupDiv.css('display', 'flex');
        });
        clearInputs(loginInputs);
        hidePopupDiv();
    } else if (clickedElementId === 'login-button' && currentAuthType !== AuthType.LOGIN) {
        currentAuthType = AuthType.LOGIN;
        deselectAuthBubble(signupButton);
        selectAuthBubble(loginButton);
        signupDiv.hide();
        loginDiv.fadeIn('fast', function(): void {
            loginDiv.css('display', 'flex');
        });
        clearInputs(signupInputs);
        hidePopupDiv();
    }
}
//-------------------------------Hide-Popup-Div-------------------------------
function hidePopupDiv(): void {
    if (popupDiv.is(':visible')) {
        popupDiv.fadeOut(100);
    }
}
//---------------------------Show-Popup-Div-Message---------------------------
function showPopupDivMessage(message: string): void {
    if (popupDiv.is(':hidden')) {
        popupDiv.fadeIn(100);
    }
    popupText.text(message);
}
//------------------------------Passwords-Match-------------------------------
function passwordsMatch(): boolean {
    let passwordsMatch: boolean = signupPasswordInput.val() === signupConfirmPasswordInput.val();
    return passwordsMatch;
}
//--------------------------Show-Password-Popup-Type--------------------------
function showPasswordPopupType(): void {
    if (!passwordsMatch()) {
        showPopupDivMessage(AuthPopup.PASSWORDS_DONT_MATCH);
    } else {
        hidePopupDiv();
    }
}
//----------------------------Deselect-Auth-Bubble----------------------------
function deselectAuthBubble(authBubbleElement: JQuery<HTMLElement>): void {
    authBubbleElement.removeClass('selected-auth');
}
//-----------------------------Select-Auth-Bubble-----------------------------
function selectAuthBubble(authBubbleElement: JQuery<HTMLElement>): void {
    authBubbleElement.addClass('selected-auth');
}
//================================-Init-Load-=================================
let shouldLoadPage: boolean = loadPage(document.body, 'authorize');
//=============================-Event-Listeners-==============================
if (shouldLoadPage) {
    authTypeButtons.on('click', applySelectTypeStyle);
    $('#auth-input-section .console-input').on('keydown', removeTextArtifacts);
    signupPasswordInputs.on('input', showPasswordPopupType);
    confirmButtons.on('click', sendAuthRequest);
}