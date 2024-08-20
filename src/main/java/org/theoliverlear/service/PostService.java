package org.theoliverlear.service;
//=================================-Imports-==================================
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.theoliverlear.communication.request.CommentRequest;
import org.theoliverlear.communication.request.PostRequest;
import org.theoliverlear.entity.content.Comment;
import org.theoliverlear.entity.content.Post;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.repository.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    //============================-Variables-=================================
    private UserService userService;
    private PostRepository postRepository;
    //===========================-Constructors-===============================
    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }
    //=============================-Methods-==================================

    //----------------------------Create-Post---------------------------------
    @Transactional
    public boolean createPost(PostRequest postRequest) {
        Optional<User> user = this.userService.getUserById(postRequest.getUserId());
        if (user.isEmpty()) {
            return false;
        }
        User poster = user.get();
        Post post = new Post(poster, postRequest.getContent());
        this.postRepository.save(post);
        poster.addPost(post);
        this.userService.save(poster);
        return true;
    }
    //---------------------Get-All-Posts-By-Poster-Id-------------------------
    @Transactional
    public List<Post> getAllPostsByPosterId(Long userId) {
        return this.postRepository.findAllByPosterId(userId);
    }
    //----------------------------Delete-Post---------------------------------
    public boolean deletePost(Long postId) {
        Post post = this.postRepository.findById(postId).orElse(null);
        if (post == null) {
            return false;
        } else {
            User user = post.getPoster();
            user.removePost(post);
            this.postRepository.deleteById(postId);
            this.userService.save(user);
            return true;
        }
    }
    //----------------------------Add-Comment---------------------------------
    @Transactional
    public boolean addComment(CommentRequest commentRequest) {
        Long postId = commentRequest.getPostId();
        Post post = this.postRepository.findById(postId).orElse(null);
        if (post == null) {
            return false;
        }
        Optional<User> user = this.userService.getUserById(commentRequest.getUserId());
        if (user.isEmpty()) {
            return false;
        }
        Comment comment = new Comment(user.get(), commentRequest.getContent());
        post.addComment(comment);
        this.postRepository.save(post);
        return true;
    }
    //-------------------------Post-Exists-By-Id------------------------------
    public boolean postExistsById(Long postId) {
        return this.postRepository.existsById(postId);
    }
}
