export type ImageAsset = {
    src: string;
    alt: string;
}
const imageAssetPath: string = 'assets/image/';
const logoImageAssetPath: string = imageAssetPath + 'logo/';
const iconImageAssetPath: string = imageAssetPath + 'icon/';
export const scriptSocialLogoCropped: ImageAsset = {
    src: logoImageAssetPath + 'script_social_cropped.png',
    alt: 'Script Social Logo'
}
export const hamburgerIcon: ImageAsset = {
    src: iconImageAssetPath + 'hamburger_menu.svg',
    alt: 'Hamburger Menu'
}
export const searchIcon: ImageAsset = {
    src: iconImageAssetPath + 'search_icon.png',
    alt: 'Search Icon'
}
export const defaultAvatar: ImageAsset = {
    src: iconImageAssetPath + 'default_avatar.svg',
    alt: 'User Avatar'
}
export const confirmIcon: ImageAsset = {
    src: iconImageAssetPath + 'confirm_icon.svg',
    alt: 'Confirm Icon'
}
export const whiteTabIcon: ImageAsset = {
    src: iconImageAssetPath + 'white_tab_icon.svg',
    alt: 'White Tab Icon'
}
export const whiteNotificationBellIcon: ImageAsset = {
    src: iconImageAssetPath + 'white_notification_bell_icon.svg',
    alt: 'White Notification Bell Icon'
}
export const whiteMailIcon: ImageAsset = {
    src: iconImageAssetPath + 'white_mail_icon.svg',
    alt: 'White Mail Icon'
}