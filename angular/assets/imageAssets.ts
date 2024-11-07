export interface ImageAsset {
    src: string;
    alt: string;
}

export function getImagePath(fileName: string): string {
    return imageAssetPath + fileName;
}
export function getLogoImagePath(fileName: string): string {
    return logoImageAssetPath + fileName;
}
export function getIconImagePath(fileName: string): string {
    return iconImageAssetPath + fileName;
}

const imageAssetPath: string = 'assets/images/';
const logoImageAssetPath: string = imageAssetPath + 'logo/';
const iconImageAssetPath: string = imageAssetPath + 'icon/';
export const scriptSocialLogoCropped: ImageAsset = {
    src: getLogoImagePath('script_social_cropped.png'),
    alt: 'Script Social Logo'
}
export const markLilianoPicture: ImageAsset = {
    src: getImagePath('mark_liliano.webp'),
    alt: 'Mark Liliano'
};
export const colinFredricksonPicture: ImageAsset = {
    src: getImagePath('colin_fredrickson.webp'),
    alt: 'Colin Fredrickson'
};
export const tatianaRamosPicture: ImageAsset = {
    src: getImagePath('tatiana_ramos.webp'),
    alt: 'Tatiana Ramos'
}
export const hamburgerIcon: ImageAsset = {
    src: getIconImagePath('hamburger_menu.svg'),
    alt: 'Hamburger Menu'
};
export const searchIcon: ImageAsset = {
    src: getIconImagePath('search_icon.png'),
    alt: 'Search Icon'
};
export const defaultAvatar: ImageAsset = {
    src: getIconImagePath('default_avatar.svg'),
    alt: 'User Avatar'
};
export const confirmIcon: ImageAsset = {
    src: getIconImagePath('confirm_icon.svg'),
    alt: 'Confirm Icon'
};
export const whiteTabIcon: ImageAsset = {
    src: getIconImagePath('white_tab_icon.svg'),
    alt: 'White Tab Icon'
};
export const whiteNotificationBellIcon: ImageAsset = {
    src: getIconImagePath('white_notification_bell_icon.svg'),
    alt: 'White Notification Bell Icon'
};
export const whiteMailIcon: ImageAsset = {
    src: getIconImagePath('white_mail_icon.svg'),
    alt: 'White Mail Icon'
};
export const whiteChatBubbleIcon: ImageAsset = {
    src: getIconImagePath('white_chat_bubble_icon.svg'),
    alt: 'White Chat Bubble Icon'
};
export const whiteRepostIcon: ImageAsset = {
    src: getIconImagePath('white_repost_icon.svg'),
    alt: 'White Repost Icon'
};
export const likeIcon: ImageAsset = {
    src: getIconImagePath('like_icon.svg'),
    alt: 'Like Icon'
};
export const whiteLikeIcon: ImageAsset = {
    src: getIconImagePath('white_like_icon.svg'),
    alt: 'White Like Icon'
};
export const whiteShareIcon: ImageAsset = {
    src: getIconImagePath('white_share_icon.svg'),
    alt: 'White Share Icon'
}
export const whiteReplyIcon: ImageAsset = {
    src: getIconImagePath('white_reply_icon.svg'),
    alt: 'White Reply Icon'
};
export const whiteCloseIcon: ImageAsset = {
    src: getIconImagePath('white_close_icon.svg'),
    alt: 'White Cancel Icon'
};
export const addIcon: ImageAsset = {
    src: getIconImagePath('add_icon.svg'),
    alt: 'Add Icon'
};
export const whiteSendIcon: ImageAsset = {
    src: getIconImagePath('white_send_icon.svg'),
    alt: 'White Send Icon'
};
export const basicWhiteConfirmIcon: ImageAsset = {
    src: getIconImagePath('basic_white_confirm_icon.svg'),
    alt: 'Basic White Confirm Icon'
}