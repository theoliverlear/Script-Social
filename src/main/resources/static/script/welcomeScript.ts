import {loadPage} from "./globalScript";
import {WelcomeProfile} from "./WelcomeProfile";

let firstInput = $('#first-input');
let welcomeButtons = $('#welcome-buttons');
let secondInput = $('#second-input');
let confirmButton = $('#confirm-button');
let backButton = $('#back-button');
let interestItems = $('.interest-item');
let interestItemsSelected: JQuery<Element>[] = [];
let builtProfile: WelcomeProfile = new WelcomeProfile();
let titleSection = $('#title-section');
let currentQuestionIndex: number = 0;
function showCorrectButton() {
    if (currentQuestionIndex === 0) {
        backButton.hide();
        welcomeButtons.css('justify-content', 'flex-end');
    } else {
        backButton.show();
        welcomeButtons.css('justify-content', 'space-between');
    }
}

function floatTitleSectionFromBottom() {
    titleSection.css('bottom', '0');

}

function nameSection() {
    let bothInputsFilled: boolean = !hasEmptyInput(firstInput) && !hasEmptyInput(secondInput);

}
function hasEmptyInput(inputElement: JQuery<HTMLElement>): boolean {
    return inputElement.val() === '';
}
function selectInterestItem(): void {
    let interestItem: JQuery<any> = $(this);
    if (interestItem.hasClass('general-select')) {
        deselectInterestItem(interestItem);
    } else {
        interestItemsSelected.push(interestItem);
        interestItem.fadeIn().toggleClass('general-select');
    }
}
function deselectInterestItem(element: JQuery<Element>): void {
    element.toggleClass('general-select');
    interestItemsSelected = interestItemsSelected.filter((item: JQuery<Element>): boolean => {
        return item.text() === element.text();
    });
}
function confirmSelection(): void {

}
function backSelection() {
    showCorrectButton();
}
function moveSelectionForward() {

}
function moveSelectionBackward() {

}

// Maybe add "What features would you like to see?" as a question.
let titleQuestions: string[] = ['What\'s your name?', 'Select your interests.'];

let shouldLoadPage = loadPage(document.body, 'welcome');
if (shouldLoadPage) {
    interestItems.on('click', selectInterestItem);
    confirmButton.on('click', confirmSelection);
    backButton.on('click', backSelection);
    floatTitleSectionFromBottom();
    showCorrectButton();
}