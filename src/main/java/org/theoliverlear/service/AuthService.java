package org.theoliverlear.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.theoliverlear.communication.request.AuthRequest;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.repository.UserRepository;

@Service
public class AuthService {
    private UserRepository userRepository;
    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public boolean signup(AuthRequest authRequest, HttpSession session) {
        if (this.userExistsByUsername(authRequest.getUsername())) {
            return false;
        }
        User user = new User(authRequest.getUsername(), authRequest.getPassword());
        this.userRepository.save(user);
        User userWithId = this.userRepository.findByUsername(authRequest.getUsername());
        session.setAttribute("user", userWithId);
        return true;
    }
    public boolean login(AuthRequest authRequest, HttpSession session) {
        if (!this.userExistsByUsername(authRequest.getUsername())) {
            return false;
        }
        User user = this.userRepository.findByUsername(authRequest.getUsername());
        boolean isAuthorized = user.getSafePassword().compareUnencodedPassword(authRequest.getPassword());
        if (isAuthorized) {
            session.setAttribute("user", user);
        }
        return isAuthorized;
    }
    public boolean userExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    public boolean logout(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return false;
        } else {
            session.removeAttribute("user");
            session.invalidate();
            return true;
        }
    }
}