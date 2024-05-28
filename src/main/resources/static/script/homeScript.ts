import {loadPage, typeNavText} from "./globalScript";

let titleBlinkingCursor: JQuery<HTMLElement> = $('#title-blinking-cursor');
let titleText: JQuery<HTMLElement> = $('#title-text');
let titleString: string = 'Script Social';

function typeTitleText(): void {
    // titleText.addClass('being-typed');
    typeNavText(titleText, titleString).then(function(): void {
        // titleText.removeClass('being-typed');
        //titleBlinkingCursor.fadeIn(100);
    });
}

if (loadPage(document.body, 'home')) {
    typeTitleText();
}