import {Injectable} from "@angular/core";
import {ErrorHandlerService} from "../error-handler.service";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {httpOptions} from "./httpProperties";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private getCurrentUserIdUrl: string = 'http://localhost:8080/api/user/get/current/id';
    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService) {
        console.log('UserService loaded');
    }
    getCurrentUserIdFromServer(): Observable<number> {
        return this.http.get<{userId: number}>(this.getCurrentUserIdUrl, httpOptions)
            .pipe(
                map(response => {
                    return response.userId;
                }),
                catchError(this.errorHandlerService.handleError<number>('getCurrentUserIdFromServer'))
            );
    }
}