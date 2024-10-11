export class Comment {
    //============================-Variables-=================================
    private _userId: number;
    private _postId: number;
    private _commentId: number;
    private _content: string;
    private _datePosted: Date;
    private _comments: Comment[];
    //===========================-Constructors-===============================
    constructor(userId: number = 0,
                postId: number = 0,
                commentId: number = 0,
                content: string = "",
                datePosted: Date = new Date(),
                comments: Comment[] = []) {
        this._userId = userId;
        this._postId = postId;
        this._commentId = commentId;
        this._content = content;
        this._datePosted = datePosted;
        this._comments = comments;
    }
    //=============================-Methods-==================================

    //----------------------------Add-Comment---------------------------------
    addComment(comment: Comment): void {
        this._comments.push(comment);
    }
    //---------------------------Remove-Comment-------------------------------
    removeComment(comment: Comment): void {
        this._comments = this._comments.filter((currentComment: Comment): boolean => {
            return !currentComment.equals(comment);
        });
    }
    //-------------------------------Equals-----------------------------------
    equals(comment: Comment): boolean {
        return this._commentId === comment.commentId;
    }
    //=============================-Getters-==================================
    get userId(): number {
        return this._userId;
    }
    get postId(): number {
        return this._postId;
    }
    get commentId(): number {
        return this._commentId;
    }
    get content(): string {
        return this._content;
    }
    get datePosted(): Date {
        return this._datePosted;
    }
    get comments(): Comment[] {
        return this._comments;
    }
    //=============================-Setters-==================================
    setUserId(userId: number): void {
        this._userId = userId;
    }
    setPostId(postId: number): void {
        this._postId = postId;
    }
    setCommentId(commentId: number): void {
        this._commentId = commentId;
    }
    setContent(content: string): void {
        this._content = content;
    }
    setDatePosted(datePosted: Date): void {
        this._datePosted = datePosted;
    }
    setComments(comments: Comment[]): void {
        this._comments = comments;
    }
}