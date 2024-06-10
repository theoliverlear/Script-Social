package org.theoliverlear.service;

import org.springframework.stereotype.Service;
import org.theoliverlear.communication.request.PostRequest;
import org.theoliverlear.entity.content.Post;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.repository.PostRepository;

@Service
public class PostService {
    private UserService userService;
    private PostRepository postRepository;
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }
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
}
