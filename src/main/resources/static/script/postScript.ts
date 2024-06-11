// Methods for making posts throughout the program

import {getCurrentUserIdFromServer} from "./globalScript";

let userPostContent:JQuery<HTMLElement> = $('#write-post-textarea')
let button :JQuery<HTMLElement> = $('#write-post-button-div')

$(function(){
    button.on('click', async () => {
       let userID: number = await getCurrentUserIdFromServer()
        console.log("user id: ", userID)
        let contentToSubmit = userPostContent.val()
        if (isValidPost(contentToSubmit)) {
            await fetch('/create/post', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userID,contentToSubmit})
            }).catch(err => console.error(err))
                .then(() => loadPosts())
        } else {
            //TODO implement stylized toast for user to see
            alert("Unable to save empty data!")
        }

    })
})

function isValidPost(message: string|number|string[]) {
    return !(message === '' || message === null)
}

function loadPosts() {
    //TODO load posts on successful post save operation
}