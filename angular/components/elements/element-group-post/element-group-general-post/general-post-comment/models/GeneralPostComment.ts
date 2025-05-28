export class GeneralPostComment {
    commenterName: string;
    userId: number;
    postId: number;
    commentId: number;
    commentText: string;
    commentDate: Date;
    constructor(commenterName: string = '',
                userId: number = 0,
                postId: number = 0,
                commentId: number = 0,
                commentText: string = '',
                commentDate: Date = new Date()) {
        this.commenterName = commenterName;
        this.userId = userId;
        this.postId = postId;
        this.commentId = commentId;
        this.commentText = commentText;
        this.commentDate = commentDate;
    }
}