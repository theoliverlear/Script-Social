//=================================-Imports-==================================
import {
    clearInput,
    getCurrentUserIdFromServer,
    loadPage
} from "./globalScript";
import {sendPostToServer} from "./postScript";
//================================-Variables-=================================

//----------------------------------Buttons-----------------------------------
let writePostButton: JQuery<HTMLElement> = $('#write-post-button-div');
//-----------------------------------Inputs-----------------------------------
let writePostTextArea: JQuery<HTMLElement> = $('#write-post-textarea');
//=============================-Server-Functions-=============================

//---------------------------------Make-Post----------------------------------
async function makePost(): Promise<void> {
    let postMessage: string = writePostTextArea.val() as string;
    let userId: number = await getCurrentUserIdFromServer();
    sendPostToServer(userId, postMessage);
    clearInput(writePostTextArea);
}
//================================-Init-Load-=================================
let shouldLoadPage: boolean = loadPage(document.body, 'create');
//=============================-Event-Listeners-==============================
if (shouldLoadPage) {
    writePostButton.on('click', makePost);
}