package org.theoliverlear.controller;
//=================================-Imports-==================================
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.WebSocketSession;
import org.theoliverlear.communication.request.InstantMessageRequest;
import org.theoliverlear.communication.response.InstantMessageResponse;
import org.theoliverlear.entity.im.Conversation;
import org.theoliverlear.entity.im.Message;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.service.ConversationService;
import org.theoliverlear.service.MessageService;
import org.theoliverlear.service.ScriptSocialService;
import org.theoliverlear.service.UserService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequestMapping("/messages")
@Controller
public class MessageController {
    //============================-Variables-=================================
    private ScriptSocialService scriptSocialService;
    private ConversationService conversationService;
    private MessageService messageService;
    private UserService userService;
    private WebSocketSession session;
    private User currentUser;
    private SimpMessagingTemplate simpMessagingTemplate;
    //===========================-Constructors-===============================
    @Autowired
    public MessageController(ScriptSocialService scriptSocialService,
                             ConversationService conversationService,
                             MessageService messageService,
                             UserService userService,
                             SimpMessagingTemplate simpMessagingTemplate) {
        this.scriptSocialService = scriptSocialService;
        this.conversationService = conversationService;
        this.messageService = messageService;
        this.userService = userService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    //=============================-Methods-==================================

    //------------------------------Message-----------------------------------
    @RequestMapping("/")
    public String message(HttpSession session) {
        Optional<User> user = this.scriptSocialService.getUserFromSession(session);
        if (user.isEmpty()) {
            return "redirect:/authorize/";
        } else {
            this.currentUser = user.get();
            return "message";
        }
    }
    //----------------------------Get-Messages--------------------------------
    @RequestMapping("/get/{id}")
    public ResponseEntity<List<InstantMessageResponse>> getMessages(@PathVariable Long id, HttpSession session) {
        if (!this.scriptSocialService.userInSession(session))  {
            return ResponseEntity.badRequest().build();
        } else {
            this.currentUser = (User) session.getAttribute("user");
        }
        Optional<Conversation> conversation = this.conversationService.findByUserIds(this.currentUser.getId(), id);
        if (conversation.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<InstantMessageResponse> messages = new ArrayList<>();
        // TODO: Add specification algorithm to not add other user's messages.
            for (Message message : conversation.get().getMessages()) {
                String fullNameOrUsername = this.userService.getNameOrUsername(message.getSender(), this.currentUser);
                String messageText = message.getMessage();
                Long senderId = message.getSender().getId();
                // TODO: Set up date service do we can show time like "5
                //       minutes ago".
                String dateSent = message.getDateSent().toString();
                InstantMessageResponse instantMessageResponse = new InstantMessageResponse(fullNameOrUsername, senderId, messageText, dateSent);
                messages.add(instantMessageResponse);
            }
        return ResponseEntity.ok(messages);
    }
    //----------------------------Send-Message--------------------------------
    @MessageMapping("/send")
    public void sendMessage(@RequestBody InstantMessageRequest instantMessageRequest, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("Received message: " + instantMessageRequest.getMessage());
        String fullNameOrUsername = this.userService.getNameOrUsername(this.currentUser);
        this.conversationService.saveMessage(instantMessageRequest, this.currentUser);
        InstantMessageResponse instantMessageResponse = new InstantMessageResponse(fullNameOrUsername, this.currentUser.getId(), instantMessageRequest.getMessage(), LocalDateTime.now().toString());
        this.simpMessagingTemplate.convertAndSend("/messages/receiver/" + instantMessageRequest.getReceiverId(), instantMessageResponse);
    }
}
