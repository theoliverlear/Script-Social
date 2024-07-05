package org.theoliverlear.controller;
//=================================-Imports-==================================
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
    //============================-Variables-=================================
    private UserService userService;
    //===========================-Constructors-===============================
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    //=============================-Methods-==================================

    //------------------------Get-Current-User-Id-----------------------------
    @RequestMapping("/get/current/id")
    public ResponseEntity<UserIdResponse> getCurrentUserId(HttpSession session) {
        // TODO: Replace with ScriptSocialService method.
        Long userId = this.userService.getCurrentUserId(session);
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(new UserIdResponse(userId), HttpStatus.OK);
    }
    //------------------------Get-Current-Username----------------------------
    @RequestMapping("/get/current/username")
    public ResponseEntity<String> getCurrentUsername(HttpSession session) {
        // TODO: Replace with ScriptSocialService method.
        String username = this.userService.getCurrentUsername(session);
        if (username == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(username, HttpStatus.OK);
    }
}
