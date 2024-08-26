//=================================-Imports-==================================
import * as CryptoJS from 'crypto-js';
import './sideBarSwipe';
import {
    hasProfilePictureFromServerById,
    hasProfilePictureFromServerByUsername
} from "./profileScript";
//================================-Variables-=================================

//------------------------------General-Content-------------------------------
let body: JQuery<HTMLElement> = $('body');
const allImages: HTMLCollectionOf<HTMLImageElement> = document.getElementsByTagName('img');
export let isLoggedIn: boolean = false;
export let currentUsername: string = '';
//----------------------------------Nav-Bar-----------------------------------
let hamburgerMenuDiv: JQuery<HTMLElement> = $('#nav-hamburger-menu');
let navItems: JQuery<HTMLElement> = $('.nav-item');
let navBar: JQuery<HTMLElement> = $('#nav-bar');
let navBarDisplayed: boolean = false;
let navBarItemsTexts: string[] = ['Home', 'Search', 'Account'];
let accountNavItem: JQuery<HTMLElement> = $('#account-nav-item');
let logoutButton: JQuery<HTMLElement> = $('#logout-button');
let accountAndLogoutDiv: JQuery<HTMLElement> = $('#account-and-logout-div');
let accountNameText: JQuery<HTMLElement> = $('#account-name-text');
let userNavMenuDiv: JQuery<HTMLElement> = $('#user-nav-menu-div');
//--------------------------------Side-Nav-Bar--------------------------------
let sideNavBar: JQuery<HTMLElement> = $('#side-nav-bar');
let sideNavBarExpanded: boolean = false;
let sideBarTabDiv: JQuery<HTMLElement> = $('#side-bar-tab-div');
let sideBarTabImg: JQuery<HTMLElement> = $('#side-bar-tab-img');
let sideBarIconTitleDivs: JQuery<HTMLElement> = $('.side-bar-icon-title-div');
//=============================-Server-Functions-=============================

//----------------------Get-Current-User-Id-From-Server-----------------------
async function getCurrentUserIdFromServer(): Promise<number> {
    let response: Response = await fetch('/user/get/current/id');
    if (response.ok) {
        let responseJson: any = await response.json();
        return responseJson.userId;
    } else {
        return -1;
    }
}
//------------------------Set-Is-Logged-In-From-Server------------------------
async function setIsLoggedInFromServer(): Promise<void> {
    let response: Response = await fetch('/authorize/isloggedin');
    if (response.ok) {
        let responseJson: any = await response.json();
        isLoggedIn = Boolean(responseJson.loggedIn);
    } else {
        isLoggedIn = false;
    }
}
//----------------------Set-Current-Username-From-Server----------------------
async function setCurrentUsernameFromServer(): Promise<void> {
    let response: Response = await fetch('/user/get/current/username');
    if (response.ok) {
        let responseJson: any = await response.json();
        currentUsername = responseJson.username;
    } else {
        currentUsername = '';
    }
}
//=============================-Client-Functions-=============================

//--------------------------Disable-Draggable-Images--------------------------
function disableDraggableImages(): void {
    for (let image of Array.from(allImages)) {
        image.draggable = false;
    }
}
//-------------------------Toggle-Side-Nav-Bar-Popout-------------------------
function toggleSideNavBarPopout(): void {
    if (sideNavBarExpanded) {
        sideNavBar.removeClass('side-nav-opened').addClass('side-nav-closed');
        sideBarIconTitleDivs.fadeOut({duration: 150, queue: false});
        sideNavBarExpanded = false;
    } else {
        sideNavBar.removeClass('side-nav-closed').addClass('side-nav-opened');
        sideBarIconTitleDivs.fadeIn({duration: 150, queue: false}).css('display', 'flex');
        sideNavBarExpanded = true;
    }
    flipSideBarTabImage();
}
//--------------------------Flip-Side-Bar-Tab-Image---------------------------
function flipSideBarTabImage(): void {
    if (sideNavBarExpanded) {
        sideBarTabImg.css('transform', 'rotate(180deg)');
    } else {
        sideBarTabImg.css('transform', 'rotate(0deg)');
    }
}
//-----------------------Toggle-Desktop-Typed-Nav-Text------------------------
async function toggleDesktopTypedNavText(): Promise<void> {
    if (!navBarDisplayed) {
        displayNavBar();
        for(let i: number = 0; i < navItems.length; i++) {
            let element: JQuery<HTMLElement> = $(navItems[i]);
            element.find('.nav-text').addClass('being-typed');
            element.show().promise().done( function() {
                for (let j: number = i + 1; j < navItems.length; j++) {
                    let nextElement: JQuery<HTMLElement> = $(navItems[j]);
                    nextElement.hide();
                }
            });
            await typeText(element.find('.nav-text'), navBarItemsTexts[i]);
            element.find('.nav-text').removeClass('being-typed');
        }
    } else {
        for (let i: number = 0; i < navItems.length; i++) {
            let element: JQuery<HTMLElement> = $(navItems[i]);
            element.find('.nav-text').removeClass('typing-completed');
            await deleteText(element.find('.nav-text'));
            setTimeout(() => element.hide(), 200);
        }
        hideNavBar();
    }
}
//---------------------------------Type-Text----------------------------------
async function typeText(element: JQuery<HTMLElement>,
                        text: string,
                        speed: number = 150,
                        addBeingTypedStyle: boolean = false): Promise<void> {
    if (addBeingTypedStyle) {
        element.addClass('being-typed');
    }
    let currentCharIndex = 0;
    return new Promise((resolve) => {
        function typeChar(): void {
            if (currentCharIndex < text.length) {
                element.append(text.charAt(currentCharIndex));
                currentCharIndex++;
                setTimeout(typeChar, speed);
            } else {
                if (addBeingTypedStyle) {
                    element.removeClass('being-typed');
                }
                resolve();
            }
        }
        typeChar();
    });
}
//--------------------------------Delete-Text---------------------------------
async function deleteText(element: JQuery<HTMLElement>,
                          speed: number = 150,
                          addBeingTypedStyle: boolean = false): Promise<void> {
    if (addBeingTypedStyle) {
        element.addClass('being-typed');
    }
    return new Promise((resolve): void => {
        function deleteChar(): void {
            let text = element.text();
            if (text.length > 0) {
                element.text(text.slice(0, -1));
                setTimeout(deleteChar, speed);
            } else {
                if (addBeingTypedStyle) {
                    element.removeClass('being-typed');
                }
                resolve();
            }
        }
        deleteChar();
    });
}
function getThymeleafImageSrc(imageSrc: string): string {
    let thymeleafImageSrc: string = '';
    if (pathIsLocalReferenced(imageSrc)) {
        thymeleafImageSrc = imageSrc.replace('../static/', '@{/') + '}';
    } else {
        thymeleafImageSrc = '@{' + imageSrc + '}';
    }
    return thymeleafImageSrc;
}
async function getProfilePictureSrcByUsername(username: string): Promise<string> {
    let hasProfilePicture: boolean = await hasProfilePictureFromServerByUsername(username);
    let imageSrc: string = '../static/image/icon/default_avatar.svg';
    if (hasProfilePicture) {
        imageSrc = `/profile/get/username/${username}/profile-picture`;
    }
    return imageSrc;
}
async function getProfilePictureSrcById(userId: number): Promise<string> {
    let hasProfilePicture: boolean = await hasProfilePictureFromServerById(userId);
    let imageSrc: string = '../static/image/icon/default_avatar.svg';
    if (hasProfilePicture) {
        imageSrc = `/profile/get/${userId}/profile-picture`;
    }
    return imageSrc;
}
function pathIsLocalReferenced(path: string): boolean {
    return path.startsWith('.');
}
//-------------------------------Is-Mobile-View-------------------------------
function isMobileView(): boolean {
    return window.innerWidth < 500;
}
//------------------------------Display-Nav-Bar-------------------------------
function displayNavBar(): void {
    if (isMobileView()) {

    } else {
        navBarDisplayed = true;
        navBar.fadeIn(200).css('display', 'flex');
        navBar.fadeIn(200).css('margin-right', 'calc(((3vw + 3vh) / 2) + 1.2em)');
    }
}
//--------------------------------Hide-Nav-Bar--------------------------------
function hideNavBar(): void {
    if (isMobileView()) {

    } else {
        navBarDisplayed = false;
        navBar.fadeOut(200).css('display', 'none');
        navBar.fadeOut(200).css('margin-right', '0');
    }
}
//------------------------------Toggle-Nav-Items------------------------------
function toggleNavItems(): void {
    if (isMobileView()) {
        toggleMobileNavItems();
    } else {
        // toggleDesktopNavItems();
        toggleDesktopTypedNavText();
    }
}
//--------------------------Toggle-Mobile-Nav-Items---------------------------
function toggleMobileNavItems(): void {
    if (navBar.css('display') === 'none') {
        navBar.fadeIn(200).css('display', 'flex');
    } else {
        navBar.fadeOut(200).css('display', 'none');
    }
}
//--------------------------Toggle-Desktop-Nav-Items--------------------------
function toggleDesktopNavItems(): void {
    let navBarItem: JQuery<any> = $(this);
    if (!navBarDisplayed) {
        displayNavBar();
        body.css('overflow', 'hidden');
        navItems.each(function (index: number): void {
            let rightOffset: number = $(window).width() - (navBarItem.offset().left + navBarItem.outerWidth());
            navBarItem.css({position: 'relative', right: -rightOffset});
            navBarItem.css('display', 'flex');
            navBarItem.animate({right: '0px'}, 1000 * (index + 1));
        }).promise().done(function(): void {
            body.css('overflow', 'auto');
        });
    } else {
        body.css('overflow', 'hidden');
        let navItemsCount: number = navItems.length;
        navItems.each(function(index: number): void {
            // Calculate distance to move item offscreen from right side
            let leftOffset: number = $(window).width();
            // Move item offscreen to right using 'left' CSS property
            navBarItem.animate({ left: leftOffset }, 500 * (navItemsCount - index));
        }).promise().done(function(): void {
            hideNavBar();
            body.css('overflow', 'auto');
        });
    }
}
//-------------------------------Hash-Password--------------------------------
function hashPassword(password: string): string {
    let hashedPassword: CryptoJS.lib.WordArray = CryptoJS.SHA256(password);
    return hashedPassword.toString();
}
//-----------------------Set-Nav-Bar-Name-And-Function------------------------
function setNavBarNameAndFunction(): void {
    if (isLoggedIn) {
        if (navElementIsTyped(accountNavItem)) {
            if (!navElementIsAccountName()) {
                accountNameText.text(currentUsername);
            }
        } else {
            navBarItemsTexts[2] = currentUsername;
        }
        accountNavItem.on('click', function(): void {
            window.location.href = '/account/';
        });
    } else {
        if (navElementIsTyped(accountNavItem)) {
            accountNameText.text('Account');
        }
        navBarItemsTexts[2] = 'Account';
        accountNavItem.on('click', function(): void {
            window.location.href = '/authorize/';
        });
    }
}
//-----------------------------Show-Logout-Button-----------------------------
function showLogoutButton(): void {
    if (isLoggedIn) {
        if (logoutButton.is(':hidden')) {
            logoutButton.fadeIn();
        }
    }
}
//-----------------------------Hide-Logout-Button-----------------------------
function hideLogoutButton(): void {
    if (logoutButton.is(':visible')) {
        logoutButton.fadeOut();
    }
}
//----------------------------Nav-Element-Is-Typed----------------------------
function navElementIsTyped(element: JQuery<HTMLElement>): boolean {
    if (element.hasClass('nav-text')) {
        return element.text() !== '';
    } else {
        let textElement: JQuery<HTMLElement> = element.find('.nav-text');
        return textElement.text() !== '';
    }
}
//------------------------Nav-Element-Is-Account-Name-------------------------
function navElementIsAccountName(): boolean {
    return accountNameText.text() === currentUsername;
}
//-------------------------------Input-Is-Empty-------------------------------
function inputIsEmpty(input: JQuery<HTMLElement>): boolean {
    return input.val().toString().trim() === '';
}
//--------------------------------Clear-Input---------------------------------
function clearInput(input: JQuery<HTMLElement>): void {
    input.val('');
}
//--------------------------------Clear-Inputs--------------------------------
function clearInputs(inputElements: JQuery<HTMLElement>[]): void {
    inputElements.forEach((inputElement: JQuery<HTMLElement>): void => {
        clearInput(inputElement);
    });
}
//---------------------------Remove-Text-Artifacts----------------------------
function removeTextArtifacts(event: JQuery.KeyDownEvent): void {
    if (event.key === ' ') {
        event.preventDefault();
    }
}
//-------------------------------Email-Is-Valid-------------------------------
function emailIsValid(emailInput: JQuery<HTMLElement>): boolean {
    return emailInput.val().toString().includes('@') &&
        emailInput.val().toString().includes('.');
}
//------------------------------Has-Empty-Inputs------------------------------
function hasEmptyInputs(inputs: JQuery<HTMLElement>[]): boolean {
    for (let input of inputs) {
        if (inputIsEmpty(input)) {
            return true;
        }
    }
    return false;
}
//-------------------------Show-Correct-User-Nav-Menu-------------------------
function showCorrectUserNavMenu(): void {
    if (isLoggedIn) {
        showUserNavMenu();
    } else {
        hideUserNavMenu();
    }
}
//-----------------------------Show-User-Nav-Menu-----------------------------
function showUserNavMenu(): void {
    userNavMenuDiv.show();
}
//-----------------------------Hide-User-Nav-Menu-----------------------------
function hideUserNavMenu(): void {
    userNavMenuDiv.hide();
}
//-------------------------------Load-Page------------------------------------
function loadPage(bodyElement: HTMLElement, pageName: string): boolean {
    return bodyElement.getAttribute('data-page') === pageName;
}
//================================-Init-Load-=================================
disableDraggableImages();
setIsLoggedInFromServer().then((): void => {
    if (isLoggedIn) {
        setCurrentUsernameFromServer().then((): void => {
            setNavBarNameAndFunction();

        });
    } else {
        setNavBarNameAndFunction();
    }
    showCorrectUserNavMenu();
});
//=============================-Event-Listeners-==============================
hamburgerMenuDiv.on('click', toggleNavItems);
accountAndLogoutDiv.on('mouseover', showLogoutButton);
accountAndLogoutDiv.on('mouseleave', hideLogoutButton);
sideBarTabDiv.on('click', toggleSideNavBarPopout);
//=================================-Exports-==================================
export { loadPage, typeText, deleteText, getCurrentUserIdFromServer,
         hashPassword, inputIsEmpty, removeTextArtifacts, emailIsValid,
         hasEmptyInputs, clearInputs, toggleSideNavBarPopout,
         sideNavBarExpanded, clearInput,getThymeleafImageSrc,
         getProfilePictureSrcByUsername, getProfilePictureSrcById,};