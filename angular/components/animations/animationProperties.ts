import {
    SideNavBarSlideAnimationProperties
} from "./models/SideNavBarSlideAnimationProperties";
import {FadeInAnimationProperties} from "./models/FadeInAnimationProperties";
import {
    FadeInOutAnimationProperties
} from "./models/FadeInOutAnimationProperties";

export const sideNavBarSlideAnimationProperties: SideNavBarSlideAnimationProperties = {
    closedWidth: 'calc((4vw + 4vh) / 2 + 1.6em)',
    openedWidth: 'calc((11vw + 11vh) / 2 + 4.4em)'
    // openedWidth: 'calc((10vw + 10vh) / 2 + 4em)'
};

export const promoCodeFadeInAnimation: FadeInAnimationProperties = {
    duration: '1200ms',
    delay: '150ms'
};
export const homeRefactorMessageFadeInAnimation: FadeInAnimationProperties = {
    duration: '600ms',
    delay: '4000ms'
};
export const homeInviteSeniorDevMessageFadeInAnimation: FadeInAnimationProperties = {
    duration: '600ms',
    delay: '7500ms'
};
export const tatianaRamosUserBubbleFadeInAnimation: FadeInAnimationProperties = {
    duration: '600ms',
    delay: '11000ms'
};
export const connectionsListButtonFadeInOutAnimation: FadeInOutAnimationProperties = {
    fadeInDuration: "100ms",
    fadeOutDuration: "100ms"
};