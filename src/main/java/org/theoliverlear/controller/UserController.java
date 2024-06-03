package org.theoliverlear.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.theoliverlear.communication.response.UserIdResponse;
import org.theoliverlear.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
    private UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @RequestMapping("/get/current/id")
    public ResponseEntity<UserIdResponse> getCurrentUserId(HttpSession session) {
        Long userId = this.userService.getCurrentUserId(session);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(new UserIdResponse(userId), HttpStatus.OK);
    }
}
