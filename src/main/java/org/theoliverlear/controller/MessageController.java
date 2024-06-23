package org.theoliverlear.controller;

import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.theoliverlear.communication.request.InstantMessageRequest;
import org.theoliverlear.communication.response.InstantMessageResponse;

import java.util.List;

@RequestMapping("/message")
@Controller
public class MessageController {
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    public MessageController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @RequestMapping("/")
    public String message(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return "redirect:/authorize/";
        }
        return "message";
    }
    @RequestMapping("/get/{id}")
    public ResponseEntity<List<InstantMessageResponse>> getMessages(@PathVariable Long id) {
        return null;
    }
    @MessageMapping("/send")
    public void sendMessage(@RequestBody InstantMessageRequest instantMessageRequest) {
        this.simpMessagingTemplate.convertAndSend("/message/receive/" + instantMessageRequest.getReceiverId(), instantMessageRequest);
    }
}
