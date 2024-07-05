package org.theoliverlear.service;
//=================================-Imports-==================================
import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.communication.request.AuthRequest;
import org.theoliverlear.communication.request.SignupRequest;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.entity.user.personal.Profile;

@Service
@Getter
public class AuthService {
    //============================-Variables-=================================
    private UserService userService;
    //===========================-Constructors-===============================
    @Autowired
    public AuthService(UserService userService) {
        this.userService = userService;
    }
    //=============================-Methods-==================================

    //-------------------------------Signup-----------------------------------
    public boolean signup(SignupRequest signupRequest, HttpSession session) {
        if (this.userService.userExistsByUsername(signupRequest.getUsername())) {
            return false;
        }
        User user = new User(signupRequest.getUsername(), signupRequest.getPassword(), signupRequest.getEmail());
        Profile profile = new Profile(user);
        user.setProfile(profile);
        this.userService.saveUser(user);
        User userWithId = this.userService.findByUsername(signupRequest.getUsername());
        session.setAttribute("user", userWithId);
        return true;
    }
    //-------------------------------Login------------------------------------
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
    //-------------------------------Logout-----------------------------------
    public boolean logout(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return false;
        } else {
            session.removeAttribute("user");
            session.invalidate();
            return true;
        }
    }
    //----------------------------Is-Logged-In--------------------------------
    public boolean isLoggedIn(HttpSession session) {
        return session.getAttribute("user") != null;
    }
}
