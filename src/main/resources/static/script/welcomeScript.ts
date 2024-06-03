//=================================-Imports-==================================
import {
    deleteText,
    getCurrentUserIdFromServer,
    loadPage,
    typeText
} from "./globalScript";
import {WelcomeProfile} from "./WelcomeProfile";
import confetti from 'canvas-confetti';
import {PromptMovement} from "./PromptMovement";
import {ProfileIntention} from "./ProfileIntention";
import {createUppy} from "./imageUploadScript";
import Uppy from "@uppy/core";
import {EmploymentStatus} from "./EmploymentStatus";
import {Interest} from "./Interest";
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
let confirmButtonText: JQuery<HTMLElement> = $('#confirm-button-text');
let backButton: JQuery<HTMLElement> = $('#back-button');
let skipButton: JQuery<HTMLElement> = $('#skip-button');
//------------------------------Interest-Section------------------------------
let bubbleItems: JQuery<HTMLElement> = $('.bubble-item');
let bubbleItemsText: JQuery<HTMLElement> = $('.bubble-item-text');
const interestsOptions: string[] = [Interest.SOFTWARE_DEVELOPMENT,
    Interest.WEB_DEVELOPMENT,
    Interest.MOBILE_DEVELOPMENT,
    Interest.DATABASE_MANAGEMENT,
    Interest.CYBERSECURITY,
    Interest.DATA_SCIENCE,
    Interest.GAME_DEVELOPMENT,
    Interest.TEAM_BUILDING,
    Interest.PROJECT_MANAGEMENT,
    Interest.ARTIFICIAL_INTELLIGENCE];
const numInterests: number = interestsOptions.length;

const profileIntentionsOptions: string[] = [ProfileIntention.NETWORKING,
    ProfileIntention.GETTING_INVOLVED,
    ProfileIntention.CONNECT_TEAM,
    ProfileIntention.FIND_TEAM,
    ProfileIntention.SOCIALIZE];
const numProfileIntentions: number = profileIntentionsOptions.length;
let interestItemsSelected: JQuery<Element>[] = [];
const employmentStatusOptions: string[] = [EmploymentStatus.INDEPENDENT,
    EmploymentStatus.EMPLOYED,
    EmploymentStatus.SEEKING_EMPLOYMENT,
    EmploymentStatus.STUDENT,
    EmploymentStatus.HOBBYIST,
    EmploymentStatus.BUILDING_TEAM];
let numEmploymentStatusOptions = employmentStatusOptions.length;
let bubbleDiv: JQuery<HTMLElement> = $('#bubble-selection-div');
//-------------------------------Title-Section--------------------------------
let titleQuestionDiv: JQuery<HTMLElement> = $('#title-question-div');
let titleQuestionText: JQuery<HTMLElement> = $('#title-question-text');
let titleSection: JQuery<HTMLElement> = $('#title-section');
let currentQuestionIndex: number = 0;
let titleQuestions: string[] = ['What\'s your name?',
    'When were you born?',
    'Select your interests.',
    'How do you plan to use Script Social?',
    'Tell us about your employment.',
'Let\'s put a face to the name!'];
//-------------------------------Popup-Content--------------------------------
let consolePopupContainer: JQuery<HTMLElement> = $('#console-popup-container');
let consolePopupText: JQuery<HTMLElement> = $('#console-popup-text');

// profile picture
let profilePictureDiv: JQuery<HTMLElement> = $('#profile-picture-div');
let defaultProfilePictureDiv: JQuery<HTMLElement> = $('#default-profile-picture-div');
let uploadUploadProfilePictureImage: JQuery<HTMLElement> = $('#upload-profile-picture-img');
let fileUploadDiv: JQuery<HTMLElement> = $('#file-upload-div');
let fileUploadInput: JQuery<HTMLElement> = $('#file-upload-input');
//----------------------------------Profile-----------------------------------
let builtProfile: WelcomeProfile = new WelcomeProfile();
//=============================-Server-Functions-=============================
async function sendProfileToServer(): Promise<void> {
    let response: Response = await fetch('/welcome/profile/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: builtProfile.firstName,
            lastName: builtProfile.lastName,
            birthDate: builtProfile.birthDate.toDateString(),
            interests: builtProfile.interests.map((interest: Interest): string => interest.toString()),
            employment: builtProfile.employment.toString(),
            profileIntention: builtProfile.profileIntention.toString()
        })
    });
    if (response.ok) {
        let userId: number = await getCurrentUserIdFromServer();
        if (userId !== -1) {
            window.location.href = '/profile/' + userId;
        }
    } else {
        console.log('Error sending profile to server.');
    }
}
//=============================-Client-Functions-=============================

function isOptionalSection(): boolean {
    return currentQuestionIndex === 3 || currentQuestionIndex === 4 || currentQuestionIndex === 5;
}
//----------------------------Show-Correct-Button-----------------------------
function showCorrectButton(): void {
    if (currentQuestionIndex === 0) {
        backButton.hide();
        skipButton.hide();
        welcomeButtons.css('justify-content', 'flex-end');
    } else if (isOptionalSection() && currentQuestionIndex !== titleQuestions.length - 1) {
        skipButton.show();
    } else if (currentQuestionIndex === titleQuestions.length - 1) {
        skipButton.hide();
        confirmButtonText.text('Finish');
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
        case 2:
            firstInputText.text('Interests: ');
            break;
        case 3:
            firstInputText.text('Profile Intention: ');
            break;
        case 4:
            firstInputText.text('Employment Status: ');
            break;
        case 5:
            firstInputText.text('Profile Picture: ');
            break;
    }
}
//--------------------------------Clear-Inputs--------------------------------
function clearInputs(): void {
    firstInput.val('');
    secondInput.val('');
    resetBubbleSelection();
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
        case 2:
            showCorrectInputs();
            showCorrectInputTitle();
            showInterestSection();
            break;
        case 3:
            showOptionalInputPopup();
            showCorrectInputs();
            showCorrectInputTitle();
            showProfileIntentionSection();
            break;
        case 4:
            showOptionalInputPopup();
            showCorrectInputs();
            showCorrectInputTitle();
            showEmploymentSection();
            break;
        case 5:
            showOptionalInputPopup();
            showCorrectInputs();
            showCorrectInputTitle();
            showProfilePictureSection();
            break;
        case 6:
            sendProfileToServer();
            break;
    }
}
// TODO: Fix issue with typing and deleting text when a button is clicked
//       while the text is still typing.
function showEmploymentSection(): void {
    if (bubbleDiv.is(':hidden')) {
        bubbleDiv.fadeIn();
    }
    bubbleItemsText.each((index: number, element: Element): void => {
        if (index < numEmploymentStatusOptions) {
            $(element).text(employmentStatusOptions[index]);
        } else {
            $(element).hide();
        }
    });
}
function showProfilePictureSection(): void {
    profilePictureDiv.fadeIn();
    defaultProfilePictureDiv.fadeIn();
    fileUploadDiv.css('display', 'flex').fadeIn();
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
    inputsSection.css('display', 'flex').fadeIn();
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
        case 2:
            setInterestInputs();
            break;
        case 3:
            setProfileIntentionInputs();
            break;
        case 4:
            setEmploymentInputs();
            break;
        case 5:
            setProfilePictureInputs();
            break;
    }
}
function setProfilePictureInputs(): void {
    if (firstInput.is(':visible')) {
        firstInput.fadeOut();
    }
    if (bubbleDiv.is(':visible')) {
        bubbleDiv.fadeOut();
    }
    if (firstInputTitleDiv.is(':visible')) {
        firstInputTitleDiv.fadeOut();
    }
}
function setProfileIntentionInputs(): void {
    bubbleDiv.fadeIn();
    bubbleItemsText.each((index: number, element: Element): void => {
        if (index < numProfileIntentions) {
            $(element).text(profileIntentionsOptions[index]);
        } else {
            $(element).hide();
        }
    });
}
function setEmploymentInputs(): void {
    bubbleDiv.fadeIn();
    bubbleItemsText.each((index: number, element: Element): void => {
        if (index < numEmploymentStatusOptions) {
            $(element).text(employmentStatusOptions[index]);
        }
    });
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
    if (bubbleDiv.is(':visible')) {
        bubbleDiv.fadeOut();
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
        case 2:
            showPopupMessage('Please select at least one interest.');
            break;
        case 3:
            showPopupMessage('This is optional.');
            break;
        case 4:
            showPopupMessage('This is optional.');
            break;
        case 5:
            showPopupMessage('This is optional.');
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
function showInterestSection(): void {
    bubbleDiv.fadeIn();
    bubbleItemsText.each((index: number, element: Element): void => {
        $(element).text(interestsOptions[index]);
    });
}

function showProfileIntentionSection(): void {
    bubbleDiv.fadeIn();
    bubbleItemsText.each((index: number, element: Element): void => {
        if (index < numProfileIntentions) {
            $(element).text(profileIntentionsOptions[index]);
        } else {
            $(element).hide();
        }
    });
}
function setInterestInputs() {
    if (firstInput.is(':visible')) {
        firstInput.fadeOut();
    }
    if (secondInput.is(':visible')) {
        secondInput.fadeOut();
    }
    if (bubbleDiv.is(':hidden')) {
        bubbleDiv.fadeIn();
    }
    bubbleItemsText.each((index: number, element: Element): void => {
        $(element).text(interestsOptions[index]);
        if (index < numInterests) {
            $(element).fadeIn();
        }
    });
}
function saveInputsOnMovement(): void {
    switch (currentQuestionIndex) {
        case 0:
            builtProfile.setFirstName(String(firstInput.val()));
            builtProfile.setLastName(String(secondInput.val()));
            break;
        case 1:
            builtProfile.setBirthDate(new Date(String(firstInput.val())));
            break;
    }
}
//-----------------------------Show-Popup-Message-----------------------------
function showPopupMessage(message: string): void {
    consolePopupText.text(message);
    consolePopupContainer.fadeIn();
}
//-----------------------------Hide-Popup-Message-----------------------------
function hidePopupMessage(): void {
    if (consolePopupContainer.is(':visible')) {
        consolePopupContainer.fadeOut();
    }
}
//------------------------------Has-Empty-Input-------------------------------
function hasEmptyInput(inputElement: JQuery<HTMLElement>): boolean {
    return inputElement.val() === '';
}
//----------------------------Select-Interest-Item----------------------------
function selectBubbleItem(): void {
    switch (currentQuestionIndex) {
        case 2:
            selectInterest($(this));
            break;
        case 3:
            selectProfileIntention($(this));
            break;
        case 4:
            selectEmploymentStatus($(this));
            break;

    }
}
function selectEmploymentStatus(employmentItem: JQuery<Element>): void {
    let indexOfEmployment: number = employmentItem.index();
    employmentItem.fadeIn().toggleClass('general-select');
    builtProfile.setEmployment(EmploymentStatus.from(employmentStatusOptions[indexOfEmployment]));
    for (let i: number = 0; i < employmentStatusOptions.length; i++) {
        if (i !== indexOfEmployment) {
            bubbleItems.eq(i).removeClass('general-select');
        }
    }
}
function resetBubbleSelection(): void {
    bubbleItems.removeClass('general-select');
    interestItemsSelected = [];
    builtProfile.setInterests([]);
    builtProfile.setProfileIntention(null);
}
function selectInterest(interestItem: JQuery<Element>): void {
    if (interestItem.hasClass('general-select')) {
        deselectInterestItem(interestItem);
    } else {
        builtProfile.addInterest(interestsOptions[interestItem.index()]);
        interestItem.fadeIn().toggleClass('general-select');
    }
}
function selectProfileIntention(intentionItem: JQuery<Element>): void {
    if (intentionItem.hasClass('general-select')) {
        builtProfile.setProfileIntention(null);
        intentionItem.removeClass('general-select');
    } else {
        let indexOfIntention: number = intentionItem.index();
        intentionItem.addClass('general-select');
        builtProfile.setProfileIntention(ProfileIntention.from(profileIntentionsOptions[indexOfIntention]));
        console.log(builtProfile.profileIntention);
        for (let i: number = 0; i < numProfileIntentions; i++) {
            if (i !== indexOfIntention) {
                bubbleItems.eq(i).removeClass('general-select');
            }
        }
    }
}
//---------------------------Deselect-Interest-Item---------------------------
function deselectInterestItem(element: JQuery<Element>): void {
    element.toggleClass('general-select');
    let indexOfInterest: number = element.index();
    builtProfile.removeInterest(interestsOptions[indexOfInterest]);
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
    saveInputsOnMovement();
    console.log(builtProfile);
    if (promptMovement === PromptMovement.BACKWARD) {
        hidePopupMessage();
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
            hidePopupMessage();
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
function showOptionalInputPopup(): void {
    if (consolePopupContainer.is(':hidden')) {
        showPopupMessage('This is optional.');
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
        case 2:
            validInputs = hasInterestSelected();
            break;
        case 3:
            validInputs = true;
            break;
        case 4:
            validInputs = true;
            break;
        case 5:
            validInputs = true;
            break;
    }
    if (!validInputs) {
        showCorrectPopupMessage();
    } else {
        hidePopupMessage();
    }
    return validInputs;
}
function hasInterestSelected(): boolean {
    return builtProfile.interests.length > 0;
}
//--------------------------Delete-Section-Question---------------------------
async function deleteSectionQuestion(): Promise<void> {
    return new Promise((resolve): void => {
        deleteText(titleQuestionText, 90).then((): void => {
            resolve();
        });
    });
}
//--------------------------------Move-Section--------------------------------
async function typeSectionQuestion(): Promise<void> {
    await typeText(titleQuestionText, titleQuestions[currentQuestionIndex], 90, true);
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
function uploadImage(uploadEvent: Event): void {
    defaultProfilePictureDiv.hide();
    fileUploadDiv.hide();
    let uploadFile: File = (uploadEvent.target as HTMLInputElement).files[0];
    let uppy: Uppy = createUppy('#image-editor', '#status-bar');
    uppy.addFile({
        name: uploadFile.name,
        type: uploadFile.type,
        data: uploadFile
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
    bubbleItems.on('click', selectBubbleItem);
    skipButton.on('click', confirmButtonPressed);
    confirmButton.on('click', confirmButtonPressed);
    backButton.on('click', backButtonPressed);
    fileUploadInput.on('change', uploadImage);
}