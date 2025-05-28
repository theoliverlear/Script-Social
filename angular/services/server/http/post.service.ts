import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErrorHandlerService} from "../../client/error-handler.service";
import {catchError, map, Observable} from "rxjs";
import {
    GeneralPost
} from "../../../components/elements/element-group-post/element-group-general-post/general-post/models/GeneralPost";
import {httpOptions} from "./httpProperties";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService) {
        console.log('PostService loaded');
    }
    getPostsFromServer(userId: number): Observable<GeneralPost[]> {
        return this.http.get<GeneralPost[]>('/post/get/' + userId, httpOptions)
            .pipe(
                map(response => this.getPostsFromResponse(response)),
                catchError(this.errorHandlerService.handleError<GeneralPost[]>('getPostsFromServer', []))
            );
    }
    getPostsFromResponse(response: any[]): GeneralPost[] {
        return response.map(postData => (
            new GeneralPost(
                postData.postText,
                postData.userId,
                postData.postId,
                new Date(postData.postedDate)
            )
        ));
    }
}