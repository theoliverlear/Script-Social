// TODO: Try to be less verbose while getting point across.
export type SideNavBarSlideAnimationProperties = {
    closedWidth: string;
    openedWidth: string;
}
export const sideNavBarSlideAnimationProperties: SideNavBarSlideAnimationProperties = {
    closedWidth: 'calc((4vw + 4vh) / 2 + 1.6em)',
    openedWidth: 'calc((10vw + 10vh) / 2 + 4em)'
};