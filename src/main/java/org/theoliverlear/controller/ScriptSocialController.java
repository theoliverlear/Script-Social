package org.theoliverlear.controller;
//=================================-Imports-==================================
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ScriptSocialController {
    //=============================-Methods-==================================

    //--------------------------------Home------------------------------------
    @RequestMapping("/")
    public String home() {
        return "home";
    }
}
