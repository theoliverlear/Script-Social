//=================================-Imports-==================================
import {inputIsEmpty, loadPage} from "./globalScript";
import SockJS from "sockjs-client";
import {Client, Stomp} from "@stomp/stompjs";
import {InstantMessage} from "./models/InstantMessage";
//================================-Variables-=================================

//----------------------------Messaging-Containers----------------------------
let connectionItems: JQuery<HTMLElement> = $('.connection-item');
let userMessages: JQuery<HTMLElement> = $('#user-messages');
//----------------------------------Buttons-----------------------------------
let userMessageSendButton: JQuery<HTMLElement> = $('#user-message-send-button');
//-----------------------------------Inputs-----------------------------------
let userMessageText: JQuery<HTMLElement> = $('#user-message-text');
//---------------------------------Web-Socket---------------------------------
let webSocket: WebSocket;
let stompClient: any;
function connectWebSocket(): void {
    webSocket = new SockJS('/ws');
    try {
        stompClient = Stomp.over(webSocket);
    } catch (error) {
        console.error('Failed to create stomp client', error);
    }
}

//=============================-Server-Functions-=============================

function isStompClientConnected(): boolean {
    return stompClient.connected;
}
//---------------------------Send-Message-To-Server---------------------------
function sendMessageToServer(): void {
    if (!isStompClientConnected()) {
        console.error('Stomp client is not connected');
        return;
    }
    const messageInfo: {receiverId: number, message: string} = {
        receiverId: 1,
        message: userMessageText.val() as string
    }
    stompClient.send('/messages/send', {}, JSON.stringify(messageInfo));
}
//---------------------------Connect-To-Web-Server----------------------------
function connectToWebServer(): void {
    stompClient.connect({}, async function (frame: any): Promise<void> {
        const testId: number = 1;
        const testMessage: string = 'Test message';
        // TODO: Get current selection on screen, then subscribe to messages
        //       for that user.
    }, function(error: any): void {
        console.error('Failed to connect to web server', error);
    });
}
//---------------------------Subscribe-To-Messages----------------------------
function subscribeToMessages(userId: number): void {
    if (!isStompClientConnected()) {
        console.error('Stomp client is not connected');
        return;
    }
    stompClient.subscribe(`/messages/receiver/${userId}`, async function (response: any): Promise<void> {
        console.log(response.body);
        let usernameOrName: string = response.body.fullNameOrUsername;
        let userId: number = response.body.userId;
        let message: string = response.body.message;
        let timestamp: string = response.body.dateSent;
        let instantMessage: InstantMessage = new InstantMessage(usernameOrName, userId, message, timestamp);
        addMessageToScreen(instantMessage);
    });
}
//=============================-Client-Functions-=============================

//---------------------------Add-Message-To-Screen----------------------------
function addMessageToScreen(instantMessage: InstantMessage): void {
    instantMessage.getHtml().then((messageItem: HTMLDivElement): void => {
        userMessages.append(messageItem);
    });
}
//-----------------------------Add-Selected-Style-----------------------------
function addSelectedStyle(): void {
    if ($(this).hasClass("general-select")) {
        $(this).removeClass("general-select");
    } else {
        connectionItems.each(function(): void {
            $(this).removeClass("general-select");
        });
        $(this).addClass("general-select");
    }
}
//--------------------------------Send-Message--------------------------------
function sendMessage(): void {
    let messageIsEmpty: boolean = inputIsEmpty(userMessageText);
    if (messageIsEmpty) {
        return;
    } else {
        sendMessageToServer();
    }
}
function initializeSession(): void {
    connectWebSocket();
    connectToWebServer();
    subscribeToMessages(1);
}
//================================-Init-Load-=================================
let shouldLoadPage: boolean = loadPage(document.body, 'message');
if (shouldLoadPage) {
    initializeSession();
}
//=============================-Event-Listeners-==============================
if (shouldLoadPage) {
    connectionItems.on('click', addSelectedStyle);
    userMessageSendButton.on('click', sendMessage);
}