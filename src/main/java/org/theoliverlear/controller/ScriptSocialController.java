package org.theoliverlear.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ScriptSocialController {
    @RequestMapping("/")
    public String home() {
        return "home";
    }
}
