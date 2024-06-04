import {loadPage} from "./globalScript";
import {UserProfile} from "./UserProfile";

let body = $('body');
let userProfile: UserProfile = new UserProfile();
let userId: number = Number(document.body.getAttribute('user-id'));

let firstNameHeadlineText = $('#first-name-headline-text');
let lastNameHeadlineText = $('#last-name-headline-text');

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
function buildUserProfile(serverResponse: any) {
    userProfile.setFirstName(serverResponse.firstName);
    userProfile.setLastName(serverResponse.lastName);
    console.log(userProfile.fullName);
    console.log(userProfile.getFirstName);
    console.log(userProfile.getLastName);
}
function applyUserProfileToPage() {
    firstNameHeadlineText.text(userProfile.getFirstName);
    lastNameHeadlineText.text(userProfile.getLastName);
}
let shouldLoad: boolean = loadPage(document.body, 'profile');
if (shouldLoad) {
    getUserDataFromServer().then(() => {
        applyUserProfileToPage();
    });
}