package org.theoliverlear.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/welcome")
public class WelcomeController {
    @RequestMapping("/")
    public String welcome() {
        return "welcome";
    }
}
