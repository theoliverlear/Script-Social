package org.theoliverlear.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.theoliverlear.communication.request.WelcomeUserRequest;
import org.theoliverlear.communication.response.OperationSuccessfulResponse;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.entity.user.personal.Interests;
import org.theoliverlear.service.InterestsService;
import org.theoliverlear.service.UserService;
import org.theoliverlear.service.WelcomeService;

@Controller
@RequestMapping("/welcome")
public class WelcomeController {
    private User currentUser;
    private WelcomeService welcomeService;
    private UserService userService;
    private InterestsService interestsService;
    @Autowired
    public WelcomeController(WelcomeService welcomeService,
                             UserService userService,
                             InterestsService interestsService) {
        this.welcomeService = welcomeService;
        this.userService = userService;
        this.interestsService = interestsService;
    }
    @RequestMapping("/")
    public String welcome(HttpSession session) {
        this.currentUser = (User) session.getAttribute("user");
        if (this.currentUser == null) {
            return "redirect:/authorize/";
        } else {
            return "welcome";
        }
    }
    @RequestMapping("/profile/add")
    public ResponseEntity<OperationSuccessfulResponse> addProfile(@RequestBody WelcomeUserRequest welcomeUserRequest, HttpSession session) {
        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser == null) {
            return new ResponseEntity<>(new OperationSuccessfulResponse(false), HttpStatus.UNAUTHORIZED);
        }
        this.currentUser = sessionUser;
        User updatedUser = this.welcomeService.applyWelcomeRequestUserParameters(this.currentUser, welcomeUserRequest);
        Interests interestsToSave = updatedUser.getInterests();
        this.interestsService.saveInterests(interestsToSave);
        Interests interestsWithId = this.interestsService.findByUserId(interestsToSave);
        updatedUser.setInterests(interestsWithId);
        this.userService.saveUser(updatedUser);
        User userWithInterests = this.userService.findByUsername(updatedUser.getUsername());
        this.currentUser = userWithInterests;
        session.setAttribute("user", this.currentUser);
        return ResponseEntity.ok(new OperationSuccessfulResponse(true));
    }
}
