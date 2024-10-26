//=================================-Imports-==================================
import 'jquery-touchswipe';
import {sideNavBarExpanded, toggleSideNavBarPopout} from "./globalScript";
//================================-Variables-=================================
let sideNavBar = $('#side-nav-bar');
//=============================-Event-Listeners-==============================
sideNavBar.swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        if (direction === 'left') {
            if (sideNavBarExpanded) {
                toggleSideNavBarPopout();
            }
        }
        if (direction === 'right') {
            if (!sideNavBarExpanded) {
                toggleSideNavBarPopout();
            }
        }
    },
    allowPageScroll: 'vertical'
});