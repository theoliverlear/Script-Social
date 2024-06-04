package org.theoliverlear.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.theoliverlear.communication.response.ProfileResponse;
import org.theoliverlear.entity.user.User;

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
    public String profileId(HttpSession session, @PathVariable String id, Model model) {
        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser == null) {
           return "redirect:/";
        }
        model.addAttribute("userId", id);
        return "profile";
    }
    @RequestMapping("/get/{id}")
    public ResponseEntity<ProfileResponse> getProfile(@PathVariable String id, HttpSession session, Model model) {
        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (sessionUser.getId().toString().equals(id)) {
            model.addAttribute("username", sessionUser.getUsername());
            return ResponseEntity.ok(new ProfileResponse(sessionUser.getFirstName(), sessionUser.getLastName(), true));
        } else {
            return ResponseEntity.ok(new ProfileResponse("John", "Doe", false));
        }
    }
}
