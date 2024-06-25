import {loadPage} from "./globalScript";
import SockJS from "sockjs-client";
import {Client, Stomp} from "@stomp/stompjs";

let connectionItems: JQuery<HTMLElement> = $('.connection-item');
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
let stompClient: any = Stomp.over(webSocket);

stompClient.connect({}, function(frame: any): void {
    const testId: number = 1;
    const testMessage: string = 'Test message';
    stompClient.subscribe(`/message/receiver/${testId}`, function(response: any): void {
        console.log(response.body);
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
    stompClient.send('/message/send', {}, JSON.stringify(messageInfo));
}
let userMessageSendButton: JQuery<HTMLElement> = $('#user-message-send-button');
let userMessageText: JQuery<HTMLElement> = $('#user-message-text');
let shouldLoadPage: boolean = loadPage(document.body, 'message');
if (shouldLoadPage) {
    connectionItems.on('click', addSelectedStyle);
    userMessageSendButton.on('click', sendMessage);
}