package org.theoliverlear.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.theoliverlear.service.ConversationService;
import org.theoliverlear.service.ScriptSocialService;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/conversation")
public class ConversationController {
    private ScriptSocialService scriptSocialService;
    private ConversationService conversationService;
    @Autowired
    public ConversationController(ScriptSocialService scriptSocialService,
                                  ConversationService conversationService) {
        this.scriptSocialService = scriptSocialService;
        this.conversationService = conversationService;
    }
    @RequestMapping("/get/{id}/usernames/all")
    public ResponseEntity<List<String>> getConversationUsernames(@PathVariable String id, HttpSession session) {
        if (!this.scriptSocialService.userInSession(session)) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
        }
        Long idAsLong = Long.parseLong(id);
        if (!this.scriptSocialService.sessionUserIdMatches(session, idAsLong)) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
        }
        List<String> conversationUsernames = this.conversationService.getConversationUsernames(idAsLong);
        return new ResponseEntity<>(conversationUsernames, HttpStatus.OK);
    }
}
