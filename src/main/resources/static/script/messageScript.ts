//=================================-Imports-==================================
import {inputIsEmpty, loadPage} from "./globalScript";
import SockJS from "sockjs-client";
import {Client, IFrame, Stomp, StompConfig} from "@stomp/stompjs";
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
let stompClient: Client;
function connectWebSocket(): void {
    webSocket = new SockJS('/ws');

    // Stomp configuration
    const stompConfig: StompConfig = {
        webSocketFactory: () => webSocket,
        reconnectDelay: 5000,
        debug: (str) => { console.log(str); },
        onConnect: (frame: IFrame) => {
            console.log('Connected: ' + frame);
            const testId: number = 1;

            // Subscribe to messages after connection
            subscribeToMessages(testId);
        },
        onStompError: (frame: IFrame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        }
    };

    // Create the STOMP client with config
    stompClient = new Client(stompConfig);

    // Activate the client
    stompClient.activate();

}

//=============================-Server-Functions-=============================

function isStompClientConnected(): boolean {
    // return stompClient.connected && stompClient;
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
    // stompClient.send('/messages/send', {}, JSON.stringify(messageInfo), function(response: any): void {
    //     console.log('Message sent successfully');
    //     userMessageText.val('');
    // }).error(function(error: any): void {
    //     console.error('Failed to send message', error);
    // });
    stompClient.publish({destination: '/messages/send', body: JSON.stringify(messageInfo)});
    userMessageText.val('');
}
//---------------------------Connect-To-Web-Server----------------------------
function connectToWebServer(): void {
    // stompClient.connect({}, async function(frame: any): Promise<void> {
    //     console.log('Connected: ' + frame);
    //     const testId: number = 1;
    //     const testMessage: string = 'Test message';
    //     // TODO: Get current selection on screen, then subscribe to messages
    //     //       for that user.
    // }, function(error: any): void {
    //     console.error('Failed to connect to web server', error);
    // });
    stompClient.onConnect = function(frame: IFrame): void {
        console.log('Connected: ' + frame);
        const testId: number = 1;
        const testMessage: string = 'Test message';
    }
    stompClient.onStompError = function(frame: IFrame): void {
        console.error('Failed to connect to web server', frame);
        console.error('Additional Error Details: ', frame.body);
    }
    stompClient.activate();
}
//---------------------------Subscribe-To-Messages----------------------------
function subscribeToMessages(userId: number): void {
    if (!isStompClientConnected()) {
        console.error('Stomp client is not connected');
        return;
    }
    console.log('Receiver ID: ' + userId);
    stompClient.subscribe(`/messages/receiver/${userId}`, async function (response: any): Promise<void> {
        console.log('Message received: ', response.body);
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
    // connectToWebServer();
    // subscribeToMessages(1);
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