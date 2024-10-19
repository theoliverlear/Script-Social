import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErrorHandlerService} from "../error-handler.service";
import {map, Observable} from "rxjs";
import {
    GeneralPostComponent
} from "../../components/elements/general-post/general-post.component";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient,
                private errorHandlerService: ErrorHandlerService) {
        console.log('PostService loaded');
    }
    getPostsFromServer(userId: number): Observable<GeneralPostComponent[]> {
        // TODO: Add some sort of default HttpHeaders to reduce repetition.
        const httpOptions: { headers: HttpHeaders } = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.get<GeneralPostComponent[]>('/post/get/' + userId, httpOptions)
            .pipe(
                map(response => response.map(postData =>
                    this.createPostComponent(postData.postText, postData.userId, postData.postId, new Date(postData.postedDate))
                )),
                this.errorHandlerService.handleError<GeneralPostComponent[]>('getPostsFromServer', [])
            );
    }
    createPostComponent(postText: string, userId: number, postId: number, postedDate: Date): GeneralPostComponent {
        return new GeneralPostComponent(postText, userId, postId, postedDate);
    }
}