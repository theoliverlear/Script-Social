import {
    ImageAsset, whiteMailIcon,
    whiteNotificationBellIcon,
    whiteTabIcon
} from "../../../assets/imageAssets";

export class SideNavBarButtonType {
    static POPOUT_TAB: SideNavBarButtonType = new SideNavBarButtonType(null, whiteTabIcon, null);
    static NOTIFICATIONS: SideNavBarButtonType = new SideNavBarButtonType('Notifications',whiteNotificationBellIcon, '/notifications');
    static MESSAGES: SideNavBarButtonType = new SideNavBarButtonType('Messages', whiteMailIcon, '/messages');
    buttonTitle: string;
    imageAsset: ImageAsset;
    urlPath: string;
    constructor(buttonTitle: string, imageAsset: ImageAsset, urlPath: string) {
        this.buttonTitle = buttonTitle;
        this.imageAsset = imageAsset;
        this.urlPath = urlPath;
    }
    equals(comparedSideNavBarButtonType: SideNavBarButtonType): boolean {
        return this.buttonTitle === comparedSideNavBarButtonType.buttonTitle
            && this.imageAsset === comparedSideNavBarButtonType.imageAsset
            && this.urlPath === comparedSideNavBarButtonType.urlPath;
    }
}