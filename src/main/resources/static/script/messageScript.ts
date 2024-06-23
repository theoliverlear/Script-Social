import {loadPage} from "./globalScript";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

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
let shouldLoadPage: boolean = loadPage(document.body, 'message');
if (shouldLoadPage) {
    connectionItems.on('click', addSelectedStyle);
}
let webSocket: WebSocket = new SockJS('/ws');
let stompClient: any = Stomp.over(webSocket);

stompClient.connect({}, function(frame: any): void {
    stompClient.subscribe('/message/send/', function(response: any): void {
        let message: string = JSON.parse(response.body).content;
        let messageElement: JQuery<HTMLElement> = $('<div class="message-item"></div>').text(message);
        $('.message-list').append(messageElement);
    });
});