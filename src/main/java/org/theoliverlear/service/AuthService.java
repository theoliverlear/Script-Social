package org.theoliverlear.service;

import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.communication.request.AuthRequest;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.entity.user.personal.Profile;

@Service
@Getter
public class AuthService {
    private UserService userService;
    @Autowired
    public AuthService(UserService userService) {
        this.userService = userService;
    }
    public boolean signup(AuthRequest authRequest, HttpSession session) {
        if (this.userService.userExistsByUsername(authRequest.getUsername())) {
            return false;
        }
        User user = new User(authRequest.getUsername(), authRequest.getPassword());
        Profile profile = new Profile(user);
        user.setProfile(profile);
        this.userService.saveUser(user);
        User userWithId = this.userService.findByUsername(authRequest.getUsername());
        session.setAttribute("user", userWithId);
        return true;
    }
    public boolean login(AuthRequest authRequest, HttpSession session) {
        if (!this.userService.userExistsByUsername(authRequest.getUsername())) {
            return false;
        }
        User user = this.userService.findByUsername(authRequest.getUsername());
        boolean isAuthorized = user.getSafePassword().compareUnencodedPassword(authRequest.getPassword());
        if (isAuthorized) {
            session.setAttribute("user", user);
        }
        return isAuthorized;
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
    public boolean isLoggedIn(HttpSession session) {
        return session.getAttribute("user") != null;
    }
}
