package org.theoliverlear.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.theoliverlear.communication.response.ProfileResponse;

@RequestMapping("/profile")
@Controller
public class ProfileController {
    @RequestMapping("/")
    public String profile(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return "redirect:/";
        }
        return "profile";
    }
    @RequestMapping("/{id}")
    public ResponseEntity<ProfileResponse> profile(HttpSession session, String id) {
        if (session.getAttribute("user") == null) {
            // Response 401 is the
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        ProfileResponse response = new ProfileResponse(session.getAttribute("user").equals(id));
        return ResponseEntity.ok(response);
    }
}
