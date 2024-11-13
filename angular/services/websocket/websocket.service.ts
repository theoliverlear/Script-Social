import {Injectable} from "@angular/core";
import {Client} from "@stomp/stompjs";
import {Observable, Subject} from "rxjs";
import SockJS from "sockjs-client";

@Injectable({
    providedIn: 'root'
})
export abstract class WebSocketService<T> {
    private url: string;
    private stompClient: Client;
    protected contentSubject: Subject<T>;
    constructor(url: string) {
        this.contentSubject = new Subject<T>();
        this.url = url;
        this.stompClient = new Client({
            webSocketFactory: (): WebSocket => new SockJS('/ws')
        });
    }
    abstract onReceive(frame: any): void;
    connect(): void {
        this.stompClient.onConnect = (): void => {
            this.stompClient.subscribe(this.url, (frame: any): void => {
                this.onReceive(frame);
            });
        }
    }
    disconnect(): void {
        if (this.stompClient) {
            this.stompClient.deactivate();
            console.log('Disconnecting from WebSocket');
        }
    }
    send(content: T) {
        this.stompClient.publish({destination: this.url, body: JSON.stringify(content)});
    }
    getContent(): Observable<T> {
        return this.contentSubject.asObservable();
    }
}