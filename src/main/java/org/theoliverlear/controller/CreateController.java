package org.theoliverlear.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.theoliverlear.communication.request.CommentRequest;
import org.theoliverlear.communication.request.PostRequest;
import org.theoliverlear.communication.response.OperationSuccessfulResponse;
import org.theoliverlear.service.PostService;
import org.theoliverlear.service.ScriptSocialService;
import org.theoliverlear.service.UserService;

@Controller
@RequestMapping("/create")
public class CreateController {
    private ScriptSocialService scriptSocialService;
    private UserService userService;
    private PostService postService;
    @Autowired
    public CreateController(ScriptSocialService scriptSocialService,
                            UserService userService,
                            PostService postService) {
        this.scriptSocialService = scriptSocialService;
        this.userService = userService;
        this.postService = postService;
    }
    @RequestMapping("/")
    public String create() {
        return "create";
    }
    @RequestMapping("/post")
    public ResponseEntity<OperationSuccessfulResponse> createPost(@RequestBody PostRequest postRequest, HttpSession session) {
        if (!this.scriptSocialService.userInSession(session)) {
            return new ResponseEntity<>(new OperationSuccessfulResponse(false), HttpStatus.UNAUTHORIZED);
        }
        boolean postCreated = this.postService.createPost(postRequest);
        return new ResponseEntity<>(new OperationSuccessfulResponse(postCreated), HttpStatus.OK);
    }
    @RequestMapping("/post/comment")
    public ResponseEntity<OperationSuccessfulResponse> createComment(@RequestBody CommentRequest commentRequest, HttpSession session) {
        if (!this.scriptSocialService.userInSession(session)) {
            return new ResponseEntity<>(new OperationSuccessfulResponse(false), HttpStatus.UNAUTHORIZED);
        }
        boolean userExists = this.userService.userExistsById(commentRequest.getUserId());
        if (!userExists) {
            return new ResponseEntity<>(new OperationSuccessfulResponse(false), HttpStatus.NOT_FOUND);
        }
        boolean postExists = this.postService.postExistsById(commentRequest.getPostId());
        if (!postExists) {
            return new ResponseEntity<>(new OperationSuccessfulResponse(false), HttpStatus.NOT_FOUND);
        }
        boolean commentCreated = this.postService.addComment(commentRequest);
        return new ResponseEntity<>(new OperationSuccessfulResponse(commentCreated), HttpStatus.OK);
    }
}
