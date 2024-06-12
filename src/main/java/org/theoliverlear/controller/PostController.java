package org.theoliverlear.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.theoliverlear.communication.response.OperationSuccessfulResponse;
import org.theoliverlear.entity.content.Post;
import org.theoliverlear.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    private PostService postService;
    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }
    @RequestMapping("/get/{userId}")
    public ResponseEntity<List<Post>> getAllPostsByPosterId(@PathVariable Long userId) {
        List<Post> posts = this.postService.getAllPostsByPosterId(userId);
        HttpStatus status = posts == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        return new ResponseEntity<>(posts, status);
    }
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<OperationSuccessfulResponse> deletePost(@PathVariable Long postId) {
        boolean postDeleted = this.postService.deletePost(postId);
        HttpStatus status = postDeleted ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(new OperationSuccessfulResponse(postDeleted), status);
    }
}
