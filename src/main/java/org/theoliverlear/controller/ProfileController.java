package org.theoliverlear.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
