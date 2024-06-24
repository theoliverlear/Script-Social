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
import org.theoliverlear.communication.response.OperationSuccessfulResponse;
import org.theoliverlear.entity.im.Conversation;
import org.theoliverlear.entity.im.Message;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.service.ConversationService;
import org.theoliverlear.service.MessageService;
import org.theoliverlear.service.ScriptSocialService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequestMapping("/message")
@Controller
public class MessageController {
    private ScriptSocialService scriptSocialService;
    private ConversationService conversationService;
    private MessageService messageService;
    private User currentUser;
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    public MessageController(ScriptSocialService scriptSocialService,
                             ConversationService conversationService,
                             MessageService messageService,
                             SimpMessagingTemplate simpMessagingTemplate) {
        this.scriptSocialService = scriptSocialService;
        this.conversationService = conversationService;
        this.messageService = messageService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }
    @RequestMapping("/")
    public String message(HttpSession session) {
        Optional<User> user = this.scriptSocialService.getUserFromSession(session);
        if (user.isEmpty()) {
            return "redirect:/authorize/";
        }
        this.currentUser = user.get();
        return "message";
    }
    @RequestMapping("/get/{id}")
    public ResponseEntity<List<InstantMessageResponse>> getMessages(@PathVariable Long id, HttpSession session) {
        if (this.scriptSocialService.userInSession(session))  {
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
                if (message.getSender().getId().equals(this.currentUser.getId())) {
                    fullNameOrUsername = "You";
                } else if (fullNameOrUsername.equals(" ")) {
                    fullNameOrUsername = message.getSender().getUsername();
                }
                String messageText = message.getMessage();
                // TODO: Set up date service do we can show time like "5
                //       minutes ago".
                String dateSent = message.getDateSent().toString();
                InstantMessageResponse instantMessageResponse = new InstantMessageResponse(fullNameOrUsername, messageText, dateSent);
                messages.add(instantMessageResponse);
            }
        }
        return ResponseEntity.ok(messages);
    }
    @MessageMapping("/send")
    public ResponseEntity<OperationSuccessfulResponse> sendMessage(@RequestBody InstantMessageRequest instantMessageRequest, HttpSession session) {
        if (this.scriptSocialService.userInSession(session)) {
            return ResponseEntity.badRequest().build();
        } else {
            this.currentUser = (User) session.getAttribute("user");
        }
        Optional<List<Conversation>> conversations = this.conversationService.findByUserIds(this.currentUser.getId(), instantMessageRequest.getReceiverId());
        if (conversations.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        boolean messageAdded = this.conversationService.addMessageToConversation(conversations.get().get(0), this.currentUser, instantMessageRequest);
        if (!messageAdded) {
            return ResponseEntity.badRequest().build();
        }
        this.simpMessagingTemplate.convertAndSend("/message/receiver/" + instantMessageRequest.getReceiverId(), instantMessageRequest.getMessage());
        return ResponseEntity.ok(new OperationSuccessfulResponse(true));
    }

}
