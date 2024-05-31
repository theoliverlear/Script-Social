//=================================-Imports-==================================
import {deleteText, loadPage, typeText} from "./globalScript";
import {WelcomeProfile} from "./WelcomeProfile";
import confetti from 'canvas-confetti';
import {PromptMovement} from "./PromptMovement";
//================================-Variables-=================================

//------------------------------General-Content-------------------------------
let body: JQuery<HTMLElement> = $('body');
//-----------------------------------Inputs-----------------------------------
let inputsSection: JQuery<HTMLElement> = $('#inputs-section');
let firstInput: JQuery<HTMLElement> = $('#first-input');
let firstInputText: JQuery<HTMLElement> = $('#first-input-text');
let firstInputTitleDiv: JQuery<HTMLElement> = $('#first-input-title-div');
let secondInput: JQuery<HTMLElement> = $('#second-input');
let secondInputText: JQuery<HTMLElement> = $('#second-input-text');
let secondInputTitleDiv: JQuery<HTMLElement> = $('#second-input-title-div');
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
function showCorrectButton(): void {
    if (currentQuestionIndex === 0) {
        backButton.hide();
        welcomeButtons.css('justify-content', 'flex-end');
    } else {
        backButton.show();
        welcomeButtons.css('justify-content', 'space-between');
    }
}
//--------------------------Show-Correct-Input-Title--------------------------
function showCorrectInputTitle(): void {
    switch (currentQuestionIndex) {
        case 0:
            firstInputText.text('First Name: ');
            secondInputText.text('Last Name: ');
            break;
        case 1:
            firstInputText.text('Birthdate: ');
            break;
    }
}
//--------------------------------Clear-Inputs--------------------------------
function clearInputs(): void {
    firstInput.val('');
    secondInput.val('');
}
//-----------------------Show-Correct-Inputs-And-Title------------------------
function showCorrectInputsAndTitle() {
    console.log(currentQuestionIndex);
    switch (currentQuestionIndex) {
        case 0:
            showCorrectInputs();
            showCorrectInputTitle();
            showNameSection();
            break;
        case 1:
            showCorrectInputs();
            showCorrectInputTitle();
            showBirthdateSection();
            break;
    }
}
//----------------------Float-Title-Section-From-Bottom-----------------------
async function floatTitleSectionFromBottom(): Promise<void> {
    return new Promise((resolve): void => {
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
//----------------------------Show-Correct-Inputs-----------------------------
function showCorrectInputs(): void {
    switch (currentQuestionIndex) {
        case 0:
            setNameInputs();
            break;
        case 1:
            setDateInput();
            break;
    }
}
//------------------------------Set-Name-Inputs-------------------------------
function setNameInputs(): void {
    if (firstInput.attr('type') !== 'text') {
        firstInput.attr('type', 'text');
    }
    if (secondInput.attr('type') !== 'text') {
        secondInput.attr('type', 'text');
    }
    if (firstInputTitleDiv.is(':hidden')) {
        firstInputTitleDiv.fadeIn();
    }
    if (secondInputTitleDiv.is(':hidden')) {
        secondInputTitleDiv.fadeIn();
    }
}
//------------------------------Show-Date-Input-------------------------------
function setDateInput(): void {
    if (firstInput.attr('type') !== 'date') {
        firstInput.attr('type', 'date');
    }
    if (firstInputTitleDiv.is(':hidden')) {
        firstInputTitleDiv.fadeIn();
    }
    if (secondInputTitleDiv.is(':visible')) {
        secondInputTitleDiv.fadeOut();
    }
}
//-----------------------------Show-Name-Section------------------------------
function showNameSection() {
    builtProfile.setFirstName(String(firstInput.val()));
    builtProfile.setLastName(String(secondInput.val()));
}
function showCorrectPopupMessage(): void {
    switch (currentQuestionIndex) {
        case 0:
            showPopupMessage('Please fill out both inputs.');
            break;
        case 1:
            showPopupMessage('Please fill out the input.');
            break;
    }
}
//---------------------------Show-Birthdate-Section---------------------------
function showBirthdateSection() {
    console.log('We are in the birthdate section.');
    secondInputTitleDiv.fadeOut();
    firstInput.attr('type', 'date');
    console.log(firstInput.val());
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
        deleteSectionQuestion().then((): void => {
            clearInputs();
            currentQuestionIndex--;
            showCorrectInputsAndTitle();
            typeSectionQuestion();
            showCorrectButton();
        });
    } else if (promptMovement === PromptMovement.FORWARD) {
        let previousIndex: number = currentQuestionIndex;
        let inputsAreValid: boolean = hasValidInputs();
        if (inputsAreValid) {
            currentQuestionIndex++;
        }
        let sectionHasChanged: boolean = previousIndex !== currentQuestionIndex;
        if (sectionHasChanged) {
            deleteSectionQuestion().then((): void => {
                if (inputsAreValid) {
                    clearInputs();
                }
                showCorrectInputsAndTitle();
                typeSectionQuestion();
                showCorrectButton();
            });
        } else {
            showCorrectPopupMessage();
        }
    }
}
//------------------------------Has-Valid-Inputs------------------------------
function hasValidInputs(): boolean {
    let validInputs: boolean;
    switch (currentQuestionIndex) {
        case 0:
            validInputs = !hasEmptyInput(firstInput) && !hasEmptyInput(secondInput);
            break;
        case 1:
            validInputs = !hasEmptyInput(firstInput);
            break;
    }
    if (!validInputs) {
        showCorrectPopupMessage();
    } else {
        hidePopupMessage();
    }
    return validInputs;
}
//--------------------------Delete-Section-Question---------------------------
async function deleteSectionQuestion(): Promise<void> {
    return new Promise((resolve): void => {
        deleteText(titleQuestionText).then((): void => {
            resolve();
        });
    });
}
//--------------------------------Move-Section--------------------------------
async function typeSectionQuestion(): Promise<void> {
    await typeText(titleQuestionText, titleQuestions[currentQuestionIndex], 100, true);
}
//------------------------------Confetti-Bursts-------------------------------
async function confettiBursts(): Promise<void> {
    return new Promise(resolve => {
        confetti({
            particleCount: 100,
            spread: 150,
            origin: {y: 0.6}
        }).then((): void => {
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