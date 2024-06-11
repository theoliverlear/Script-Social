import {AuthType} from "./AuthType";
import {loadPage} from "./globalScript";

let currentAuthType = AuthType.SIGNUP;
let signupButton= $('#signup-button');
let loginButton= $('#login-button');
let authTypeButtons= $('.auth-type-button');
let signupDiv= $('#signup-div');
let loginDiv= $('#login-div');
let signupPopupConfirmDiv= $('#signup-popup-confirm-div');
let loginPopupConfirmDiv= $('#login-popup-confirm-div');
let signupPopupDiv= $('#signup-popup-div');
let loginPopupDiv= $('#login-popup-div');

function applySelectTypeStyle() {
    let clickedElementId = this.id;
    if (clickedElementId === 'signup-button' && currentAuthType !== AuthType.SIGNUP) {
        currentAuthType = AuthType.SIGNUP;
        styleCorrectPopupDiv();
        deselectAuthBubble(loginButton);
        selectAuthBubble(signupButton);
        loginDiv.hide();
        signupDiv.fadeIn('fast', function() {
            signupDiv.css('display', 'flex');
        });
    } else if (clickedElementId === 'login-button' && currentAuthType !== AuthType.LOGIN) {
        currentAuthType = AuthType.LOGIN;
        styleCorrectPopupDiv();
        deselectAuthBubble(signupButton);
        selectAuthBubble(loginButton);
        signupDiv.hide();
        loginDiv.fadeIn('fast', function() {
            loginDiv.css('display', 'flex');
        });
    }
}

function styleCorrectPopupDiv() {
    if (currentAuthType === AuthType.SIGNUP) {
        if (signupPopupDiv.is(':hidden')) {
            signupPopupConfirmDiv.css('justify-content', 'flex-end');
        } else {
            signupPopupConfirmDiv.css('justify-content', 'space-between');
        }
    } else if (currentAuthType === AuthType.LOGIN) {
        if (loginPopupDiv.is(':hidden')) {
            loginPopupConfirmDiv.css('justify-content', 'flex-end');
        } else {
            loginPopupConfirmDiv.css('justify-content', 'space-between');
        }
    }
}

function sendAuthRequest() {
    if (currentAuthType === AuthType.SIGNUP) {
        sendSignupRequest();
    } else if (currentAuthType === AuthType.LOGIN) {
        sendLoginRequest();

    }
}
function sendSignupRequest() {

}
function sendLoginRequest() {

}
function deselectAuthBubble(authBubbleElement: JQuery<HTMLElement>) {
    authBubbleElement.removeClass('selected-auth');
}

function selectAuthBubble(authBubbleElement: JQuery<HTMLElement>) {
    authBubbleElement.addClass('selected-auth');
}


let shouldLoadPage = loadPage(document.body, 'authorize');
if (shouldLoadPage) {
    authTypeButtons.on('click', applySelectTypeStyle);
}