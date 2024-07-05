package org.theoliverlear.controller;
//=================================-Imports-==================================
import jakarta.servlet.http.HttpSession;
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
        Optional<List<Conversation>> conversations = this.conversationService.findByUserIds(this.currentUser.getId(), id);
        if (conversations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<InstantMessageResponse> messages = new ArrayList<>();
        // TODO: Add specification algorithm to not add other user's messages.
        for (Conversation conversation : conversations.get()) {
            for (Message message : conversation.getMessages()) {
                String fullNameOrUsername = message.getSender().getFirstName() + " " + message.getSender().getLastName();
                Long senderId = message.getSender().getId();
                if (senderId.equals(this.currentUser.getId())) {
                    fullNameOrUsername = "You";
                } else if (fullNameOrUsername.equals(" ")) {
                    fullNameOrUsername = message.getSender().getUsername();
                }
                String messageText = message.getMessage();
                // TODO: Set up date service do we can show time like "5
                //       minutes ago".
                String dateSent = message.getDateSent().toString();
                InstantMessageResponse instantMessageResponse = new InstantMessageResponse(fullNameOrUsername, senderId, messageText, dateSent);
                messages.add(instantMessageResponse);
            }
        }
        return ResponseEntity.ok(messages);
    }
    //----------------------------Send-Message--------------------------------
    @MessageMapping("/send")
    public void sendMessage(@RequestBody InstantMessageRequest instantMessageRequest, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("Received message: " + instantMessageRequest.getMessage());
//        if (!this.scriptSocialService.userInSession(headerAccessor)) {
//            System.out.println("User not in session.");
//            return;
//        } else {
//            Optional<User> possibleCurrentUser = this.scriptSocialService.getUserFromSession(headerAccessor);
//            if (possibleCurrentUser.isEmpty()) {
//                System.out.println("No current user found.");
//                return;
//            } else {
//                System.out.println("Current user found.");
//                this.currentUser = possibleCurrentUser.get();
//            }
//        }
        if (this.currentUser == null) {
            System.out.println("No current user found.");
            return;
        }
        System.out.println("Current user: " + this.currentUser.getUsername());
        Optional<List<Conversation>> conversations = this.conversationService.findByUserIds(this.currentUser.getId(), instantMessageRequest.getReceiverId());
        Optional<User> possibleReceiver = this.userService.getUserById(instantMessageRequest.getReceiverId());
        if (conversations.isEmpty()) {
            System.out.println("No conversation found.");
            if (possibleReceiver.isEmpty()) {
                System.out.println("No receiver found.");
                return;
            } else {
                User receiver = possibleReceiver.get();
                Conversation newConversation = this.conversationService.createConversation(this.currentUser, receiver);
                conversations.get().add(newConversation);
            }
        }
        if (possibleReceiver.isEmpty()) {
            System.out.println("No receiver found.");
            return;
        }
        if (conversations.get().get(0) == null) {
            System.out.println("No conversation found.");
            return;
        }
        boolean messageAdded = this.conversationService.addMessageToConversation(conversations.get().get(0), this.currentUser, instantMessageRequest);
        System.out.println("Message added: " + messageAdded);
//        if (!messageAdded) {
//            return;
//        }
        String fullNameOrUsername = this.currentUser.getFirstName() + " " + this.currentUser.getLastName();
        if (fullNameOrUsername.equals(" ")) {
            fullNameOrUsername = this.currentUser.getUsername();
        }
        InstantMessageResponse instantMessageResponse = new InstantMessageResponse(fullNameOrUsername, this.currentUser.getId(), instantMessageRequest.getMessage(), LocalDateTime.now().toString());
        this.simpMessagingTemplate.convertAndSend("/messages/receiver/" + instantMessageRequest.getReceiverId(), instantMessageResponse);
    }
}
