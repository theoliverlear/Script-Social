// Methods for making posts throughout the program

import {Post} from "./Post";

function sendPostToServer(userId: number, message: string): void {
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
        let responseJson = await response.json();
        console.log('responseJson: ', responseJson);
        return responseJson;
    }
}
function getPostsFromServerResponse(response: any): Post[] {
    let postsFromServer: Post[] = [];
    console.log('response: ', response);
    if (Array.isArray(response)) {
        response.forEach((postJson: any): void => {
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

function loadPosts(rootElement: JQuery<HTMLElement>, userId: number): void {
    getPostsFromServer(userId).then((response: any): void => {
        let posts: Post[] = getPostsFromServerResponse(response);
        posts.forEach((post: Post): void => {
            console.log(post.message);
            let postDiv: HTMLDivElement = document.createElement('div');
            postDiv.classList.add('general-post');
            postDiv.innerHTML = post.getHtml();
            rootElement.append(postDiv);
        });
    });
}
export { sendPostToServer, getPostsFromServer, getPostsFromServerResponse,
         isValidPost, loadPosts };