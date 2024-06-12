// Methods for making posts throughout the program

import {Post} from "./Post";

function sendPostToServer(userId: number, message: string) {
    if (isValidPost(message) && userId !== -1) {
        console.log('userId: ', userId);
        console.log('message: ', message);
        let post: Post = new Post(message, userId);
        fetch('/create/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: post.userId,
                content: post.message
            })
        }).catch(error => {
            console.error('Error: ', error);
        });
    }
}
async function getPostsFromServer(userId: number): Promise<any> {
    let response: void | Response = await fetch('/post/get/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(error => {
        console.error('Error: ', error);
    });
    if (response) {
        return await response.json();
    }
}
function getPostsFromServerResponse(response: any): Post[] {
    let postsFromServer: Post[] = [];
    if (Array.isArray(response)) {
        response.forEach((postJson: any) => {
            let post: Post = new Post(postJson.content, postJson.poster,
                                      postJson.id, postJson.timePosted);
            postsFromServer.push(post);
        });
    }
    return postsFromServer;
}
function isValidPost(message: string): boolean {
    let messageIsNull: boolean = message === null;
    let messageIsEmpty: boolean = message === '';
    return !messageIsNull && !messageIsEmpty;
}

function loadPosts() {
    //TODO: load posts on successful post save operation
}
export { sendPostToServer, getPostsFromServer, getPostsFromServerResponse,
         isValidPost, loadPosts };