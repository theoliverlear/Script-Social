import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {HashPasswordService} from "./hash-password.service";
import {ErrorHandlerService} from "./error-handler.service";

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    private _signupUrl: string = '/authorize/signup';
    constructor(private http: HttpClient,
                private hashPasswordService: HashPasswordService,
                private errorHandlerService: ErrorHandlerService) {
        console.log('SignupService loaded');
    }
    sendSignupToServer(username: string, email: string, unhashedPassword: string): Observable<boolean> {
        const hashedPassword: string = this.hashPasswordService.hashPassword(unhashedPassword);
        const httpOptions: { headers: HttpHeaders } = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const signupInfo = {
            email: email,
            username: username,
            password: hashedPassword
        }
        return this.http.post<{ authorized: boolean }>(this._signupUrl, signupInfo, httpOptions)
            .pipe(
                map(response => response.authorized),
                catchError(this.errorHandlerService.handleError<boolean>('sendSignupToServer', false))
            );
    }

}
