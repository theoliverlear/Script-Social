//=================================-Imports-==================================
import {loadPage, typeText} from "./globalScript";
import {WelcomeProfile} from "./WelcomeProfile";
import confetti from 'canvas-confetti';
import {PromptMovement} from "./PromptMovement";
//================================-Variables-=================================

//------------------------------General-Content-------------------------------
let body: JQuery<HTMLElement> = $('body');
//-----------------------------------Inputs-----------------------------------
let inputsSection: JQuery<HTMLElement> = $('#inputs-section');
let firstInput: JQuery<HTMLElement> = $('#first-input');
let secondInput: JQuery<HTMLElement> = $('#second-input');
//----------------------------------Buttons-----------------------------------
let welcomeButtons: JQuery<HTMLElement> = $('#welcome-buttons');
let confirmButton: JQuery<HTMLElement> = $('#confirm-button');
let backButton: JQuery<HTMLElement> = $('#back-button');
//------------------------------Interest-Section------------------------------
let interestItems: JQuery<HTMLElement> = $('.interest-item');
let interestItemsSelected: JQuery<Element>[] = [];
//-------------------------------Title-Section--------------------------------
let titleQuestionDiv: JQuery<HTMLElement> = $('#title-question-div');
let titleQuestionText: JQuery<HTMLElement> = $('#title-question-text');
let titleSection: JQuery<HTMLElement> = $('#title-section');
let currentQuestionIndex: number = 0;
let titleQuestions: string[] = ['What\'s your name?',
                                'When were you born?',
                                'Select your interests.',
                                'How do you plan to use Script Social?'];
//-------------------------------Popup-Content--------------------------------
let consolePopupContainer: JQuery<HTMLElement> = $('#console-popup-container');
let consolePopupText: JQuery<HTMLElement> = $('#console-popup-text');
//----------------------------------Profile-----------------------------------
let builtProfile: WelcomeProfile = new WelcomeProfile();
//=============================-Server-Functions-=============================

//=============================-Client-Functions-=============================

//----------------------------Show-Correct-Button-----------------------------
function showCorrectButton() {
    if (currentQuestionIndex === 0) {
        backButton.hide();
        welcomeButtons.css('justify-content', 'flex-end');
    } else {
        backButton.show();
        welcomeButtons.css('justify-content', 'space-between');
    }
}
//-----------------------Show-Correct-Inputs-And-Title------------------------
function showCorrectInputsAndTitle(): PromptMovement {
    let promptMovement: PromptMovement;
    switch (currentQuestionIndex) {
        case 0:
            promptMovement = showNameSection();
            break;
    }
    return promptMovement;
}
//----------------------Float-Title-Section-From-Bottom-----------------------
async function floatTitleSectionFromBottom(): Promise<void> {
    return new Promise((resolve) => {
        body.css('overflow-y', 'hidden');
        let bottom = $(window).height() - titleSection.height();
        titleSection.css({position: 'relative', bottom: -bottom});
        titleSection.animate({bottom: 0}, 2500).promise().done(function () {
            body.css('overflow-y', 'auto');
            resolve();
        });
    });
}
//----------------------------Show-Inputs-Section-----------------------------
function showInputsSection(): void {
    inputsSection.fadeIn();
    //titleSection.fadeOut();
}
//-----------------------------Show-Name-Section------------------------------
function showNameSection(): PromptMovement {
    let bothInputsFilled: boolean = !hasEmptyInput(firstInput) && !hasEmptyInput(secondInput);
    if (bothInputsFilled) {
        if (consolePopupContainer.is(':visible')) {
            hidePopupMessage()
        }
        builtProfile.setFirstName(String(firstInput.val()));
        builtProfile.setLastName(String(secondInput.val()));
        return PromptMovement.FORWARD;
    } else {
        showPopupMessage('Please fill out both inputs.');
        return PromptMovement.NO_CHANGE;
    }
}
//-----------------------------Show-Popup-Message-----------------------------
function showPopupMessage(message: string): void {
    consolePopupText.text(message);
    consolePopupContainer.fadeIn();
}
//-----------------------------Hide-Popup-Message-----------------------------
function hidePopupMessage(): void {
    consolePopupContainer.fadeOut();
}
//------------------------------Has-Empty-Input-------------------------------
function hasEmptyInput(inputElement: JQuery<HTMLElement>): boolean {
    return inputElement.val() === '';
}
//----------------------------Select-Interest-Item----------------------------
function selectInterestItem(): void {
    let interestItem: JQuery<any> = $(this);
    if (interestItem.hasClass('general-select')) {
        deselectInterestItem(interestItem);
    } else {
        interestItemsSelected.push(interestItem);
        interestItem.fadeIn().toggleClass('general-select');
    }
}
//---------------------------Deselect-Interest-Item---------------------------
function deselectInterestItem(element: JQuery<Element>): void {
    element.toggleClass('general-select');
    interestItemsSelected = interestItemsSelected.filter((item: JQuery<Element>): boolean => {
        return item.text() === element.text();
    });
}
//---------------------------Confirm-Button-Pressed---------------------------
function confirmButtonPressed(): void {
    moveSection(PromptMovement.FORWARD);
}
//----------------------------Back-Button-Pressed-----------------------------
function backButtonPressed(): void {
    moveSection(PromptMovement.BACKWARD);
}
//--------------------------------Move-Section--------------------------------
function moveSection(promptMovement: PromptMovement): void {
    if (promptMovement === PromptMovement.BACKWARD) {
        currentQuestionIndex--;
        typeSectionQuestion();
    }
    if (showCorrectInputsAndTitle() === PromptMovement.FORWARD) {
        currentQuestionIndex++;
        typeSectionQuestion();
    }
    showCorrectButton();
}
//--------------------------------Move-Section--------------------------------
async function typeSectionQuestion(): Promise<void> {
    await typeText(titleQuestionText, titleQuestions[currentQuestionIndex]);
}
//------------------------------Confetti-Bursts-------------------------------
async function confettiBursts(): Promise<void> {
    return new Promise(resolve => {
        confetti({
            particleCount: 100,
            spread: 150,
            origin: {y: 0.6}
        }).then(() => {
            resolve();
        });
    });
}
//================================-Init-Load-=================================
let shouldLoadPage: boolean = loadPage(document.body, 'welcome');
if (shouldLoadPage) {
    showCorrectButton();
    confettiBursts();
    floatTitleSectionFromBottom().then(async (): Promise<void> => {
        showInputsSection();
        await new Promise(resolve => setTimeout(resolve, 250));
        await typeSectionQuestion();

    });
}
//=============================-Event-Listeners-==============================
if (shouldLoadPage) {
    interestItems.on('click', selectInterestItem);
    confirmButton.on('click', confirmButtonPressed);
    backButton.on('click', backButtonPressed);
}