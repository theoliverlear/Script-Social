package org.theoliverlear.controller;
//=================================-Imports-==================================
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.theoliverlear.communication.response.OperationSuccessfulResponse;
import org.theoliverlear.entity.content.Post;
import org.theoliverlear.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostController {
    //============================-Variables-=================================
    private PostService postService;
    //===========================-Constructors-===============================
    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }
    //=============================-Methods-==================================

    //---------------------Get-All-Posts-By-Poster-Id-------------------------
    @Transactional
    @RequestMapping("/get/{userId}")
    public ResponseEntity<List<Post>> getAllPostsByPosterId(@PathVariable Long userId) {
        long startTime = System.currentTimeMillis();
        List<Post> posts = this.postService.getAllPostsByPosterId(userId);
        HttpStatus status = posts == null ? HttpStatus.NOT_FOUND : HttpStatus.OK;
        if (posts != null) {
            posts.forEach(System.out::println);
        }
        long endTime = System.currentTimeMillis();
        long timeInSeconds = (endTime - startTime) / 1000;
        System.out.println("Time taken to get all posts by user ID: " + timeInSeconds + " seconds");
        return new ResponseEntity<>(posts, status);
    }
    //----------------------------Delete-Post---------------------------------
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<OperationSuccessfulResponse> deletePost(@PathVariable Long postId) {
        boolean postDeleted = this.postService.deletePost(postId);
        HttpStatus status = postDeleted ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(new OperationSuccessfulResponse(postDeleted), status);
    }
}
