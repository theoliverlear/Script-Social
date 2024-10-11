//=================================-Imports-==================================
import {
    clearInput,
    getCurrentUserIdFromServer,
    loadPage
} from "./globalScript";
import {UserProfile} from "./models/UserProfile";
import {loadPostsToElements, sendPostToServer} from "./postScript";
//================================-Variables-=================================

//-----------------------------------Cache------------------------------------
let userProfile: UserProfile = new UserProfile();
let profileUserId: number = Number(document.body.getAttribute('user-id'));
//------------------------------Profile-Picture-------------------------------
let profilePictureImage: JQuery<HTMLElement> = $('#profile-picture-img');
//-------------------------------Name-Headline--------------------------------
let firstNameHeadlineText: JQuery<HTMLElement> = $('#first-name-headline-text');
let lastNameHeadlineText: JQuery<HTMLElement> = $('#last-name-headline-text');
//-----------------------------Write-Post-Section-----------------------------
let writePostButton: JQuery<HTMLElement> = $('#write-post-button-div');
let writePostTextArea: JQuery<HTMLElement> = $('#write-post-textarea');
//--------------------------------Profile-Bio---------------------------------
let profileBioText: JQuery<HTMLElement> = $('#profile-bio-text');
//------------------------------Activity-Section------------------------------
let activitySection: JQuery<HTMLElement> = $('#activity-section');
//=============================-Server-Functions-=============================

//-------------------------Get-User-Data-From-Server--------------------------
async function getUserDataFromServer(): Promise<void> {
    let response: void | Response = await fetch(`/profile/get/${profileUserId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(error => {
        console.error('Error: ', error);
    });
    if (response) {
        let user = await response.json();
        buildUserProfile(user);
    }
}
//----------------------Has-Profile-Picture-From-Server-----------------------
async function hasProfilePictureFromServerById(userId: number): Promise<boolean> {
    let response: Response = await fetch(`/profile/get/${userId}/has-profile-picture`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        let responseJson = await response.json();
        return responseJson.hasProfilePicture;
    } else {
        return false;
    }
}
async function hasProfilePictureFromServerByUsername(username: string): Promise<boolean> {
    let response: Response = await fetch(`/profile/get/username/${username}/has-profile-picture`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        let responseJson = await response.json();
        return responseJson.hasProfilePicture;
    } else {
        return false;
    }
}
//=============================-Client-Functions-=============================

//---------------------------------Make-Post----------------------------------
async function makePost(): Promise<void> {
    let postMessage: string = writePostTextArea.val() as string;
    let userId: number = await getCurrentUserIdFromServer();
    sendPostToServer(userId, postMessage);
    clearInput(writePostTextArea);
}
//------------------------Get-Profile-Picture-Sequence------------------------
async function getProfilePictureSequence(): Promise<void> {
    let hasProfilePicture: boolean = await hasProfilePictureFromServerById(profileUserId);
    if (hasProfilePicture) {
        profilePictureImage.attr('src', `/profile/get/${profileUserId}/profile-picture`);
    }
}
//-----------------------------Build-User-Profile-----------------------------
function buildUserProfile(serverResponse: any): void {
    userProfile.setFirstName(serverResponse.firstName);
    userProfile.setLastName(serverResponse.lastName);
    userProfile.setBio(serverResponse.bio);
    console.log(userProfile.fullName);
    console.log(userProfile.getFirstName);
    console.log(userProfile.getLastName);
}
//-------------------------Apply-User-Profile-To-Page-------------------------
function applyUserProfileToPage(): void {
    firstNameHeadlineText.text(userProfile.getFirstName);
    lastNameHeadlineText.text(userProfile.getLastName);
    profileBioText.text(userProfile.getBio);
}
//================================-Init-Load-=================================
let shouldLoad: boolean = loadPage(document.body, 'profile');
if (shouldLoad) {
    getProfilePictureSequence();
    getUserDataFromServer().then((): void => {
        applyUserProfileToPage();
    });
    loadPostsToElements(activitySection, profileUserId);
}
//=============================-Event-Listeners-==============================
if (shouldLoad) {
    writePostButton.on('click', makePost);
}
//=================================-Exports-==================================
export {hasProfilePictureFromServerById, hasProfilePictureFromServerByUsername};