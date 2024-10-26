export class GeneralPost {
    postText: string;
    userId: number;
    postId: number;
    postedDate: Date;
    constructor(postText: string = '',
                userId: number = 0,
                postId: number = 0,
                postedDate: Date = new Date()) {
        console.log('GeneralPostComponent loaded');
    }
}