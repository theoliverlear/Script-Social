package org.theoliverlear.controller;
//=================================-Imports-==================================
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.theoliverlear.communication.request.AuthRequest;
import org.theoliverlear.communication.request.SignupRequest;
import org.theoliverlear.communication.response.AuthResponse;
import org.theoliverlear.communication.response.LogoutResponse;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.service.AuthService;

import java.util.Optional;

@Controller
@RequestMapping("/authorize")
public class AuthController {
    //============================-Variables-=================================
    private AuthService authService;
    //===========================-Constructors-===============================
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    //=============================-Methods-==================================

    //-----------------------------Authorize----------------------------------
    @RequestMapping("/")
    public String authorize() {
        return "authorize";
    }
    //-------------------------------Signup-----------------------------------
    @RequestMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest signupRequest, HttpSession session) {
        boolean isAuthorized = this.authService.signup(signupRequest, session);
        HttpStatus status = isAuthorized ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(new AuthResponse(isAuthorized, false), status);
    }
    //-------------------------------Login------------------------------------
    @Transactional
    @RequestMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest, HttpSession session) {
        boolean isAuthorized = this.authService.login(authRequest, session);
        HttpStatus status = isAuthorized ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        Optional<User> possibleUser = this.authService.getUserService().findByUsername(authRequest.getUsername());
        boolean welcomeCompleted = false;
        if (possibleUser.isPresent()) {
            welcomeCompleted = possibleUser.get().isCompletedWelcomeSurvey();
        }
        return new ResponseEntity<>(new AuthResponse(isAuthorized, welcomeCompleted), status);
    }
    //-------------------------------Logout-----------------------------------
    @RequestMapping("/logout")
    public ResponseEntity<LogoutResponse> logout(HttpSession session) {
        boolean isLoggedOut = this.authService.logout(session);
        HttpStatus status = isLoggedOut ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(new LogoutResponse(isLoggedOut), status);
    }
    //----------------------------Is-Logged-In--------------------------------
    @RequestMapping("/isloggedin")
    public ResponseEntity<AuthResponse> isLoggedIn(HttpSession session) {
        boolean isLoggedIn = this.authService.isLoggedIn(session);
        boolean welcomeCompleted = false;
        if (isLoggedIn) {
            User user = (User) session.getAttribute("user");
            if (user != null) {
                welcomeCompleted = user.isCompletedWelcomeSurvey();
            }
        }
        HttpStatus status = isLoggedIn ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return new ResponseEntity<>(new AuthResponse(isLoggedIn, welcomeCompleted), status);
    }
}
