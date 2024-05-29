import {loadPage, typeNavText} from "./globalScript";

let titleBlinkingCursor: JQuery<HTMLElement> = $('#title-blinking-cursor');
let titleText: JQuery<HTMLElement> = $('#title-text');
let titleString: string = 'Script Social';
let popupAndConfirmDiv = $('#popup-and-confirm-div');
let popupDiv = $('#popup-div');
let popupText = $('#popup-text');
function typeTitleText(): void {
    // titleText.addClass('being-typed');
    typeNavText(titleText, titleString).then(function(): void {
        // titleText.removeClass('being-typed');
        //titleBlinkingCursor.fadeIn(100);
    });
}
function applyPopupAndConfirmDivContainer() {
    if (popupDiv.css('display') === 'none') {
        popupAndConfirmDiv.css('justify-content', 'flex-end');
    } else {
        popupAndConfirmDiv.css('justify-content', 'space-between');
    }
}
let usernameInput = $('#join-console-username-input');
let passwordInput = $('#join-console-password-input');
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
        console.log('Is authorized: ', isAuthorized);
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
let confirmJoinButton = $('#confirm-join-button');
if (loadPage(document.body, 'home')) {
    typeTitleText();
    applyPopupAndConfirmDivContainer();
    confirmJoinButton.on('click', sendSignupToServer);
}
