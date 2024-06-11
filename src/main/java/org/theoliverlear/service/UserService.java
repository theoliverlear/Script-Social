package org.theoliverlear.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.repository.UserRepository;

import java.util.Optional;

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
    public boolean userExistsById(Long id) {
        return this.userRepository.existsById(id);
    }
    public Long getCurrentUserId(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return null;
        }
        return user.getId();
    }
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public String getCurrentUsername(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return user.getUsername();
    }
    public User getUserById(Long id) {
//        Optional<User> user = this.userRepository.findById(id);
        User user = this.userRepository.findUserById(id);
        return user;
    }
}
