package org.theoliverlear.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.repository.UserRepository;

@Service
public class UserService {
    private UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public void saveUser(User user) {
        this.userRepository.save(user);
    }
    public boolean userExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    public Long getCurrentUserId(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return user.getId();
    }
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
