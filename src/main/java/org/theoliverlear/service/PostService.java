package org.theoliverlear.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.theoliverlear.communication.request.CommentRequest;
import org.theoliverlear.communication.request.PostRequest;
import org.theoliverlear.entity.content.Comment;
import org.theoliverlear.entity.content.Post;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.repository.PostRepository;

import java.util.List;

@Service
public class PostService {
    private UserService userService;
    private PostRepository postRepository;
    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }
    @Transactional
    public boolean createPost(PostRequest postRequest) {
        User user = this.userService.getUserById(postRequest.getUserId());
        if (user == null) {
            return false;
        }
        Post post = new Post(user, postRequest.getContent());
        this.postRepository.save(post);
        user.addPost(post);
        this.userService.saveUser(user);
        return true;
    }
    @Transactional
    public List<Post> getAllPostsByPosterId(Long userId) {
        return this.postRepository.findAllByPosterId(userId);
    }
    public boolean deletePost(Long postId) {
        Post post = this.postRepository.findById(postId).orElse(null);
        if (post == null) {
            return false;
        } else {
            User user = post.getPoster();
            user.removePost(post);
            this.postRepository.deleteById(postId);
            this.userService.saveUser(user);
            return true;
        }
    }
    @Transactional
    public boolean addComment(CommentRequest commentRequest) {
        Long postId = commentRequest.getPostId();
        Post post = this.postRepository.findById(postId).orElse(null);
        if (post == null) {
            return false;
        }
        User user = this.userService.getUserById(commentRequest.getUserId());
        if (user == null) {
            return false;
        }
        Comment comment = new Comment(user, commentRequest.getContent());
        post.addComment(comment);
        this.postRepository.save(post);
        return true;
    }
    public boolean postExistsById(Long postId) {
        return this.postRepository.existsById(postId);
    }
}
