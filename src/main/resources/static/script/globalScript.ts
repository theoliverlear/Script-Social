//================================-Variables-=================================

//------------------------------General-Content-------------------------------
let body = $('body');
const allImages: HTMLCollectionOf<HTMLImageElement> = document.getElementsByTagName('img');
//----------------------------------Nav-Bar-----------------------------------
let hamburgerMenuDiv = $('#nav-hamburger-menu');
let navItems = $('.nav-item');
let navBar = $('#nav-bar');
let navBarDisplayed: boolean = false;
let navBarItemsTexts: string[] = ['Home', 'Search', 'Account'];


//=============================-Server-Functions-=============================

//=============================-Client-Functions-=============================

//--------------------------Disable-Draggable-Images--------------------------
function disableDraggableImages(): void {
    for (let image of Array.from(allImages)) {
        image.draggable = false;
    }
}
//-----------------------Toggle-Desktop-Typed-Nav-Text------------------------
async function toggleDesktopTypedNavText(): Promise<void> {
    if (!navBarDisplayed) {
        displayNavBar();
        for(let i = 0; i < navItems.length; i++) {
            let element = $(navItems[i]);
            element.find('.nav-text').addClass('being-typed');
            element.show().promise().done( function() {
                for (let j = i + 1; j < navItems.length; j++) {
                    let nextElement = $(navItems[j]);
                    nextElement.hide();
                }
            });
            await typeText(element.find('.nav-text'), navBarItemsTexts[i]);
            element.find('.nav-text').removeClass('being-typed');
        }
    } else {
        for (let i: number = 0; i < navItems.length; i++) {
            let element = $(navItems[i]);
            element.find('.nav-text').removeClass('typing-completed');
            await deleteText(element.find('.nav-text'));
            // Add a delay of 200 ms before hiding the element
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
async function deleteText(element: JQuery<HTMLElement>, speed: number = 150): Promise<void> {
    return new Promise((resolve): void => {
        function deleteChar(): void {
            let text = element.text();
            if (text.length > 0) {
                element.text(text.slice(0, -1));
                setTimeout(deleteChar, speed);
            } else {
                resolve();
            }
        }
        deleteChar();
    });
}
//-------------------------------Is-Mobile-View-------------------------------
function isMobileView(): boolean {
    return window.innerWidth < 500;
}
//------------------------------Display-Nav-Bar-------------------------------
function displayNavBar() {
    if (isMobileView()) {

    } else {
        navBarDisplayed = true;
        navBar.fadeIn(200).css('display', 'flex');
        navBar.fadeIn(200).css('margin-right', 'calc(((3vw + 3vh) / 2) + 1.2em)');
    }
}
//--------------------------------Hide-Nav-Bar--------------------------------
function hideNavBar() {
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
//================================-Init-Load-=================================
disableDraggableImages();
//-------------------------------Load-Page------------------------------------
function loadPage(bodyElement: HTMLElement, pageName: string): boolean {
    return bodyElement.getAttribute('data-page') === pageName;
}
//=============================-Event-Listeners-==============================
hamburgerMenuDiv.on('click', toggleNavItems);
//==================================-Export-==================================
export { loadPage, typeText, deleteText };