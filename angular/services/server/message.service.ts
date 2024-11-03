import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ErrorHandlerService} from "../error-handler.service";
import {Message} from "../../models/Message";
import {catchError, map, Observable} from "rxjs";
import {httpOptions} from "./httpProperties";

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService) {
        console.log('MessageService loaded');
    }
    getMessagesFromServer(userId: number): Observable<Message[]> {
        return this.http.get<Message[]>('/message/get/' + userId, httpOptions)
            .pipe(
                map(response => this.getMessagesFromResponse(response)),
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