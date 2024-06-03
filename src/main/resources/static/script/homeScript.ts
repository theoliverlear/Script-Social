//=================================-Imports-==================================
import {hashPassword, loadPage, typeText} from "./globalScript";
//================================-Variables-=================================

//-------------------------------Title-Content--------------------------------
let titleBlinkingCursor: JQuery<HTMLElement> = $('#title-blinking-cursor');
let titleText: JQuery<HTMLElement> = $('#title-text');
const titleString: string = 'Script Social';
//-----------------------------------Popup------------------------------------
let popupAndConfirmDiv = $('#popup-and-confirm-div');
let popupDiv: JQuery<HTMLElement> = $('#popup-div');
let popupText: JQuery<HTMLElement> = $('#popup-text');
let messagePopupConsole: JQuery<HTMLElement> = $('#message-popup-console');
let consoleMessageText: JQuery<HTMLElement> = $('#console-message-text');
const fillAllFieldsMessage: string = 'Please fill all fields.';
const passwordsDoNotMatchMessage: string = 'Passwords do not match.';
const invalidEmailMessage: string = 'Invalid email.';
//-----------------------------------Inputs-----------------------------------
// TODO: Add the rest of the inputs like email and confirm password.
let emailInput: JQuery<HTMLElement> = $('#join-console-email-input');
let usernameInput: JQuery<HTMLElement> = $('#join-console-username-input');
let passwordInput: JQuery<HTMLElement> = $('#join-console-password-input');
let confirmPasswordInput: JQuery<HTMLElement> = $('#join-console-confirm-password-input');
let confirmJoinButton: JQuery<HTMLElement> = $('#confirm-join-button');
let joinInputs: JQuery<HTMLElement>[] = [emailInput, usernameInput, passwordInput, confirmPasswordInput];
let passwordInputs: JQuery<HTMLElement>[] = [passwordInput, confirmPasswordInput];
//=============================-Server-Functions-=============================

//---------------------------Send-Signup-To-Server----------------------------
function sendSignupToServer() {
    let hashedPassword: string = hashPassword(passwordInput.val().toString());
    fetch('/authorize/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameInput.val(),
            password: hashedPassword
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

function containsEmptyFields(): boolean {
    return inputIsEmpty(usernameInput) ||
           inputIsEmpty(passwordInput) ||
           inputIsEmpty(confirmPasswordInput) ||
           inputIsEmpty(emailInput);
}
function removeArtifacts(event: JQuery.KeyDownEvent): void {
    if (event.key === ' ') {
        event.preventDefault();
    }
}
function passwordsMatch(): boolean {
    return passwordInput.val() === confirmPasswordInput.val();
}
function emailIsValid(): boolean {
    return emailInput.val().toString().includes('@') &&
           emailInput.val().toString().includes('.');
}
function inputIsEmpty(input: JQuery<HTMLElement>): boolean {
    return input.val().toString().trim() === '';
}
function showCorrectMessageForTypingInput(): void {
    if (!passwordsMatch()) {
        showPopupMessage(passwordsDoNotMatchMessage);
        return;
    }
    hidePopupMessage();
}
function showCorrectMessageForConfirmJoin(): void {
    if (!emailIsValid()) {
        showPopupMessage(invalidEmailMessage);
        return;
    }
    if (containsEmptyFields()) {
        showPopupMessage(fillAllFieldsMessage);
        return;
    }
}
function typeInputSequence(): void {
    showCorrectMessageForTypingInput();
}
function allValidInputs(): boolean {
    return passwordsMatch() && emailIsValid() && !containsEmptyFields();
}
function confirmJoinSequence(): void {
    let validInputs: boolean = allValidInputs();
    if (validInputs) {
        sendSignupToServer();
    } else {
        showCorrectMessageForConfirmJoin();
    }
}
function showPopupMessage(message: string): void {
    if (messagePopupConsole.is(':hidden')) {
        consoleMessageText.text(message);
        messagePopupConsole.fadeIn(100);
    } else {
        consoleMessageText.text(message).fadeIn();
    }
}
function hidePopupMessage(): void {
    if (messagePopupConsole.is(':visible')) {
        messagePopupConsole.fadeOut(100);
    }
}
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
    confirmJoinButton.on('click', confirmJoinSequence);
    joinInputs.forEach((inputElement: JQuery<HTMLElement>) => {
        inputElement.on('keydown', removeArtifacts);
    });
    passwordInputs.forEach((inputElement: JQuery<HTMLElement>) => {
        inputElement.on('input', typeInputSequence);
    });

}