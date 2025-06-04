import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ErrorHandlerService} from "../../client/error-handler.service";
import {Message} from "../../../models/message/Message";
import {catchError, map, Observable} from "rxjs";
import {httpOptions} from "./httpProperties";
import {ClientMessage} from "../../../models/message/ClientMessage";
import {Communicative} from "../../../models/message/Communicative";

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService) {

    }
    // Websocket handles this.
    // sendMessageToServer(message: ClientMessage): Observable<Message> {
    //     return this.http.post<Message>('/api/messages/send', message, httpOptions)
    //         .pipe(
    //             catchError(this.errorHandlerService.handleError<Message>('sendMessageToServer', null))
    //         );
    // }
    getContent(): Observable<Communicative> {
        return null;
    }
    sendMessageToServer(clientMessage: ClientMessage) {

    }
    getMessagesFromServer(userId: number): Observable<Message[]> {
        return this.http.get<Message[]>('/api/messages/get/' + userId, httpOptions)
            .pipe(
                map((response: Message[]) => this.getMessagesFromResponse(response)),
                catchError(this.errorHandlerService.handleError<Message[]>('getMessagesFromServer', []))
            );
    }
    getMessagesFromResponse(response: any[]): Message[] {
        return response.map(messageData => (
            new Message(
                messageData.messageId,
                messageData.usersName,
                new Date(messageData.messageDate),
                messageData.messageText
            )
        ));
    }
}