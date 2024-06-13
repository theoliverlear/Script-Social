import {getCurrentUserIdFromServer, loadPage} from "./globalScript";
import {UserProfile} from "./UserProfile";
import {loadPosts, sendPostToServer} from "./postScript";

let body: JQuery<HTMLElement> = $('body');
let userProfile: UserProfile = new UserProfile();
let userId: number = Number(document.body.getAttribute('user-id'));
let profilePictureImage: JQuery<HTMLElement> = $('#profile-picture-img');

let firstNameHeadlineText: JQuery<HTMLElement> = $('#first-name-headline-text');
let lastNameHeadlineText: JQuery<HTMLElement> = $('#last-name-headline-text');

let writePostButton: JQuery<HTMLElement> = $('#write-post-button-div');
let writePostTextArea: JQuery<HTMLElement> = $('#write-post-textarea');

let profileBioText: JQuery<HTMLElement> = $('#profile-bio-text');
let activitySection: JQuery<HTMLElement> = $('#activity-section');

async function makePost(): Promise<void> {
    let postMessage: string = writePostTextArea.val() as string;
    let userId: number = await getCurrentUserIdFromServer();
    sendPostToServer(userId, postMessage);
}

async function getUserDataFromServer(): Promise<void> {
    let response = await fetch(`/profile/get/${userId}`, {
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
async function hasProfilePictureFromServer(): Promise<boolean> {
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
async function getProfilePictureSequence(): Promise<void> {
    let hasProfilePicture: boolean = await hasProfilePictureFromServer();
    if (hasProfilePicture) {
        profilePictureImage.attr('src', `/profile/get/${userId}/profile-picture`);
    }
}
function buildUserProfile(serverResponse: any): void {
    userProfile.setFirstName(serverResponse.firstName);
    userProfile.setLastName(serverResponse.lastName);
    userProfile.setBio(serverResponse.bio);
    console.log(userProfile.fullName);
    console.log(userProfile.getFirstName);
    console.log(userProfile.getLastName);
}
function applyUserProfileToPage(): void {
    firstNameHeadlineText.text(userProfile.getFirstName);
    lastNameHeadlineText.text(userProfile.getLastName);
    profileBioText.text(userProfile.getBio);
}
let shouldLoad: boolean = loadPage(document.body, 'profile');
if (shouldLoad) {
    getProfilePictureSequence();
    getUserDataFromServer().then((): void => {
        applyUserProfileToPage();
    });
    loadPosts(activitySection, userId);
    writePostButton.on('click', makePost);
}