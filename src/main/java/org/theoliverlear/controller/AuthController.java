package org.theoliverlear.controller;
//=================================-Imports-==================================
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.theoliverlear.communication.request.AuthRequest;
import org.theoliverlear.communication.request.SignupRequest;
import org.theoliverlear.communication.response.AuthResponse;
import org.theoliverlear.communication.response.LogoutResponse;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.service.AuthService;

import java.util.Optional;

@RestController
@RequestMapping("/api/authorize")
public class AuthController {
    //============================-Variables-=================================
    private AuthService authService;
    //===========================-Constructors-===============================
    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    //=============================-Methods-==================================

    //-------------------------------Signup-----------------------------------
    @RequestMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest signupRequest, HttpSession session) {
        boolean isAuthorized = this.authService.signup(signupRequest, session);
        HttpStatus status = isAuthorized ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(new AuthResponse(isAuthorized), status);
    }
    //-------------------------------Login------------------------------------
    @Transactional
    @RequestMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest, HttpSession session) {
        boolean isAuthorized = this.authService.login(authRequest, session);
        HttpStatus status = isAuthorized ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return new ResponseEntity<>(new AuthResponse(isAuthorized), status);
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
        HttpStatus status = isLoggedIn ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return new ResponseEntity<>(new AuthResponse(isLoggedIn), status);
    }
}
