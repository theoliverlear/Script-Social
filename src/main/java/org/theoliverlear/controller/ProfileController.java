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
        Long idLong = Long.parseLong(id);
        boolean isMe = sessionUser.getId().equals(idLong);
        String firstName = sessionUser.getFirstName();
        String lastName = sessionUser.getLastName();
        ProfileResponse response = new ProfileResponse(firstName, lastName, isMe);
        model.addAttribute("profile", response);
        return "profile";
    }
}
