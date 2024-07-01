import 'jquery-touchswipe';
import {sideNavBarExpanded, toggleSideNavBar} from "./globalScript";

let sideNavBar = $('#side-nav-bar');
sideNavBar.swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        if (direction === 'left') {
            if (sideNavBarExpanded) {
                toggleSideNavBar();
            }
        }
        if (direction === 'right') {
            if (!sideNavBarExpanded) {
                toggleSideNavBar();
            }
        }
    },
    allowPageScroll: 'vertical'
});