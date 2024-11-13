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
import org.theoliverlear.communication.request.WelcomeCompletedRequest;
import org.theoliverlear.communication.request.WelcomeUserRequest;
import org.theoliverlear.communication.response.OperationSuccessfulResponse;
import org.theoliverlear.communication.response.WelcomeCompletedResponse;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.service.InterestsService;
import org.theoliverlear.service.ScriptSocialService;
import org.theoliverlear.service.UserService;
import org.theoliverlear.service.WelcomeService;

import java.util.Optional;

@RestController
@RequestMapping("/api/welcome")
public class WelcomeController {
    //============================-Variables-=================================
    private User currentUser;
    private WelcomeService welcomeService;
    private UserService userService;
    private InterestsService interestsService;
    private ScriptSocialService scriptSocialService;
    //===========================-Constructors-===============================
    @Autowired
    public WelcomeController(WelcomeService welcomeService,
                             UserService userService,
                             InterestsService interestsService,
                             ScriptSocialService scriptSocialService) {
        this.welcomeService = welcomeService;
        this.userService = userService;
        this.interestsService = interestsService;
        this.scriptSocialService = scriptSocialService;
    }
    //=============================-Methods-==================================

    @Transactional
    @RequestMapping("/profile/add")
    public ResponseEntity<OperationSuccessfulResponse> addProfile(@RequestBody WelcomeUserRequest welcomeUserRequest, HttpSession session) {
        boolean userInSession = this.scriptSocialService.userInSession(session);
        if (!userInSession) {
            return new ResponseEntity<>(new OperationSuccessfulResponse(false), HttpStatus.UNAUTHORIZED);
        }
        Optional<User> possibleSessionUser = this.scriptSocialService.getUserFromSession(session);
        if (possibleSessionUser.isEmpty()) {
            return new ResponseEntity<>(new OperationSuccessfulResponse(false), HttpStatus.UNAUTHORIZED);
        }
        User sessionUser = possibleSessionUser.get();
        this.currentUser = sessionUser;
        User updatedUser = this.welcomeService.applyWelcomeRequestUserParameters(this.currentUser, welcomeUserRequest);
        this.currentUser = updatedUser;
        session.setAttribute("user", this.currentUser);
        return ResponseEntity.ok(new OperationSuccessfulResponse(true));
    }
    @RequestMapping("/get/completed")
    public ResponseEntity<WelcomeCompletedResponse> getWelcomeCompleted(@RequestBody WelcomeCompletedRequest welcomeCompletedRequest) {
        boolean userExists = this.userService.getUserById(welcomeCompletedRequest.getUserId()).isPresent();
        HttpStatus status = userExists ? HttpStatus.BAD_REQUEST : HttpStatus.OK;
        if (!userExists) {
            return new ResponseEntity<>(new WelcomeCompletedResponse(false), status);
        }
        boolean isCompleted = this.welcomeService.userHasCompletedWelcome(welcomeCompletedRequest);
        return new ResponseEntity<>(new WelcomeCompletedResponse(isCompleted), status);
    }
}
