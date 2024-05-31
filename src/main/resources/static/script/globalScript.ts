let hamburgerMenuDiv = $('#nav-hamburger-menu');
// TODO: Have each nav bar item come in one at a time from the right.
let navItems = $('.nav-item');
let navBar = $('#nav-bar');
let body = $('body');
let navBarDisplayed: boolean = false;
let navBarItemsTexts: string[] = ['Home', 'Search', 'Account'];
// Have an option where the options are typed in one at a time.
const images: HTMLCollectionOf<HTMLImageElement> = document.getElementsByTagName('img');
for (let image of Array.from(images)) {
    image.draggable = false;
}
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
        for(let i = 0; i < navItems.length; i++) {
            let element = $(navItems[i]);
            element.find('.nav-text').removeClass('typing-completed');
            await deleteText(element.find('.nav-text'));
            // Add a delay of 200 ms before hiding the element
            setTimeout(() => element.hide(), 200);
        }
        hideNavBar();
    }
}
async function typeText(element: JQuery<HTMLElement>, text: string, speed: number = 150): Promise<void> {
    let currentCharIndex = 0;
    return new Promise((resolve) => {
        function typeChar(): void {
            if (currentCharIndex < text.length) {
                element.append(text.charAt(currentCharIndex));
                currentCharIndex++;
                setTimeout(typeChar, 150);
            } else {
                resolve();
            }
        }
        typeChar();
    });
}
async function deleteText(element: JQuery<HTMLElement>, speed: number = 150): Promise<void> {
    return new Promise((resolve) => {
        function deleteChar(): void {
            let text = element.text();
            if (text.length > 0) {
                element.text(text.slice(0, -1));
                setTimeout(deleteChar, 150);
            } else {
                resolve();
            }
        }
        deleteChar();
    });
}
function isMobileView(): boolean {
    return window.innerWidth < 500;
}
function displayNavBar() {
    if (isMobileView()) {

    } else {
        navBarDisplayed = true;
        navBar.fadeIn(200).css('display', 'flex');
        navBar.fadeIn(200).css('margin-right', 'calc(((3vw + 3vh) / 2) + 1.2em)');
    }
}
function hideNavBar() {
    if (isMobileView()) {

    } else {
        navBarDisplayed = false;
        navBar.fadeOut(200).css('display', 'none');
        navBar.fadeOut(200).css('margin-right', '0');
    }
}
function toggleNavItems(): void {
    if (isMobileView()) {
        toggleMobileNavItems();
    } else {
        // toggleDesktopNavItems();
        toggleDesktopTypedNavText();
    }
}
function toggleMobileNavItems(): void {
    if (navBar.css('display') === 'none') {
        navBar.fadeIn(200).css('display', 'flex');
    } else {
        navBar.fadeOut(200).css('display', 'none');
    }
}

function toggleDesktopNavItems(): void {
    if (!navBarDisplayed) {
        displayNavBar();
        body.css('overflow', 'hidden');
        navItems.each(function (index) {
            let right = $(window).width() - ($(this).offset().left + $(this).outerWidth());
            $(this).css({position: 'relative', right: -right});
            $(this).css('display', 'flex');
            $(this).animate({right: '0px'}, 1000 * (index + 1));
        }).promise().done(function () {
            body.css('overflow', 'auto');
        });
    } else {
        body.css('overflow', 'hidden');
        let navItemsCount = navItems.length;

        navItems.each(function(index) {
            // Calculate distance to move item offscreen from right side
            let left = $(window).width();

            // Move item offscreen to right using 'left' CSS property
            $(this).animate({ left: left }, 500 * (navItemsCount - index));
        }).promise().done(function() {
            hideNavBar();
            body.css('overflow', 'auto');
        });
    }
}

//-------------------------------Load-Page------------------------------------
function loadPage(bodyElement: HTMLElement, pageName: string): boolean {
    return bodyElement.getAttribute('data-page') === pageName;
}
export { loadPage, typeText };
hamburgerMenuDiv.on('click', toggleNavItems);