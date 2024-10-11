export class Post {
    //============================-Variables-=================================
    private _message: string;
    private _userId: number;
    private _postId: number;
    private _postedDate: Date;
    //===========================-Constructors-===============================
    constructor(message: string = '', userId: number = 0, postId: number = 0, postedDate: Date = new Date()) {
        this._message = message;
        this._userId = userId;
        this._postId = postId;
        this._postedDate = postedDate;
    }
    //=============================-Methods-==================================

    //------------------------------Get-Html----------------------------------
    getHtml(): string {
        return `
            <div>
                <p>
                    ${this._message}
                </p>
            </div>
        `;
    }
    //=============================-Getters-==================================
    get message(): string {
        return this._message;
    }
    get userId(): number {
        return this._userId;
    }
    get postId(): number {
        return this._postId;
    }
    get postedDate(): Date {
        return this._postedDate;
    }
    //=============================-Setters-==================================
    setMessage(message: string): void {
        this._message = message;
    }
    setUserId(userId: number): void {
        this._userId = userId;
    }
    setPostId(postId: number): void {
        this._postId = postId;
    }
    setPostedDate(postedDate: Date): void {
        this._postedDate = postedDate;
    }
}