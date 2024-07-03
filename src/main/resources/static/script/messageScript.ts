import {loadPage} from "./globalScript";
import SockJS from "sockjs-client";
import {Client, Stomp} from "@stomp/stompjs";
import {InstantMessage} from "./models/InstantMessage";

let connectionItems: JQuery<HTMLElement> = $('.connection-item');
let userMessages: JQuery<HTMLElement> = $('#user-messages');
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

let webSocket: WebSocket = new SockJS('/ws');
let stompClient: any;
try {
    stompClient = Stomp.over(webSocket);
} catch (error) {
    console.error('Failed to create stomp client', error);
}
stompClient.connect({}, async function(frame: any): Promise<void> {
    const testId: number = 1;
    const testMessage: string = 'Test message';
    stompClient.subscribe(`/messages/receiver/${testId}`, async function(response: any): Promise<void> {
        console.log(response.body);
        let usernameOrName: string = response.body.fullNameOrUsername;
        let userId: number = response.body.userId;
        let message: string = response.body.message;
        let timestamp: string = response.body.dateSent;
        let instantMessage: InstantMessage = new InstantMessage(usernameOrName, userId, message, timestamp);
        let messageItem: HTMLDivElement = await instantMessage.getHtml();
        userMessages.append(messageItem);
    });
});
function sendMessage(): void {
    if (userMessageText.val() === '') {
        return;
    }
    const messageInfo: {receiverId: number, message: string} = {
        receiverId: 1,
        message: userMessageText.val() as string
    }
    stompClient.send('/messages/send', {}, JSON.stringify(messageInfo));
}
let userMessageSendButton: JQuery<HTMLElement> = $('#user-message-send-button');
let userMessageText: JQuery<HTMLElement> = $('#user-message-text');
let shouldLoadPage: boolean = loadPage(document.body, 'message');
if (shouldLoadPage) {
    connectionItems.on('click', addSelectedStyle);
    userMessageSendButton.on('click', sendMessage);
}