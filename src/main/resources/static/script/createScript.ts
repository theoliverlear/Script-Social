import {getCurrentUserIdFromServer, loadPage} from "./globalScript";
import {sendPostToServer} from "./postScript";

let writePostButton: JQuery<HTMLElement> = $('#write-post-button-div');
let writePostTextArea: JQuery<HTMLElement> = $('#write-post-textarea');

async function makePost(): Promise<void> {
    let postMessage: string = writePostTextArea.val() as string;
    let userId: number = await getCurrentUserIdFromServer();
    sendPostToServer(userId, postMessage);
    // TODO: Make globalScript function called clearInput.
    writePostTextArea.val('');
}
let shouldLoadPage: boolean = loadPage(document.body, 'create');
if (shouldLoadPage) {
    writePostButton.on('click', makePost);
}