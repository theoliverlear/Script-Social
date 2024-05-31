//=================================-Imports-==================================
import {loadPage, typeText} from "./globalScript";
//================================-Variables-=================================

//-------------------------------Title-Content--------------------------------
let titleBlinkingCursor: JQuery<HTMLElement> = $('#title-blinking-cursor');
let titleText: JQuery<HTMLElement> = $('#title-text');
const titleString: string = 'Script Social';
//-----------------------------------Popup------------------------------------
let popupAndConfirmDiv = $('#popup-and-confirm-div');
let popupDiv: JQuery<HTMLElement> = $('#popup-div');
let popupText: JQuery<HTMLElement> = $('#popup-text');
//-----------------------------------Inputs-----------------------------------
// TODO: Add the rest of the inputs like email and confirm password.
let usernameInput: JQuery<HTMLElement> = $('#join-console-username-input');
let passwordInput: JQuery<HTMLElement> = $('#join-console-password-input');
let confirmJoinButton: JQuery<HTMLElement> = $('#confirm-join-button');
//=============================-Server-Functions-=============================

//---------------------------Send-Signup-To-Server----------------------------
function sendSignupToServer() {
    fetch('/authorize/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameInput.val(),
            password: passwordInput.val()
        })
    }).then(response => response.json()).then(responseJson => {
        console.log(responseJson);
        let isAuthorized: boolean = responseJson.authorized;
        if (isAuthorized) {
            window.location.href = '/profile/';
        } else {
            popupDiv.fadeIn(100);
            popupText.text('Username or email already exists');
        }
    }).catch(error => {
        console.error('Error: ', error);
    });
}
//=============================-Client-Functions-=============================

//------------------------------Type-Title-Text-------------------------------
function typeTitleText(): void {
    // titleText.addClass('being-typed');
    typeText(titleText, titleString).then(function(): void {
        // titleText.removeClass('being-typed');
        //titleBlinkingCursor.fadeIn(100);
    });
}
//-------------------Apply-Popup-And-Confirm-Div-Container--------------------
function applyPopupAndConfirmDivContainer() {
    if (popupDiv.css('display') === 'none') {
        popupAndConfirmDiv.css('justify-content', 'flex-end');
    } else {
        popupAndConfirmDiv.css('justify-content', 'space-between');
    }
}
//================================-Init-Load-=================================
let shouldLoadPage: boolean = loadPage(document.body, 'home');
if (shouldLoadPage) {
    typeTitleText();
    applyPopupAndConfirmDivContainer();
}
//=============================-Event-Listeners-==============================
if (shouldLoadPage) {
    confirmJoinButton.on('click', sendSignupToServer);
}