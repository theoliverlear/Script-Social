package org.theoliverlear.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.communication.request.InstantMessageRequest;
import org.theoliverlear.entity.im.Conversation;
import org.theoliverlear.entity.im.Message;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.repository.ConversationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {
    private ConversationRepository conversationRepository;
    private MessageService messageService;
    private UserService userService;
    @Autowired
    public ConversationService(ConversationRepository conversationRepository,
                               MessageService messageService,
                               UserService userService) {
        this.conversationRepository = conversationRepository;
        this.messageService = messageService;
        this.userService = userService;
    }
    public Optional<List<Conversation>> findByUserIds(Long... userIds) {
        List<Long> userIdsList = List.of(userIds);
        return this.findByUserIds(userIdsList);
    }
    public Optional<List<Conversation>> findByUserIds(List<Long> userIds) {
        List<Conversation> conversations = this.conversationRepository.findByUserIds(userIds);
        if (conversations == null) {
            return Optional.empty();
        } else {
            return Optional.of(conversations);
        }
    }
    public boolean addMessageToConversation(Conversation conversation, User user, InstantMessageRequest instantMessageRequest) {
        Long recipientId = instantMessageRequest.getReceiverId();
        User recipient = this.userService.getUserById(recipientId);
        if (recipient == null) {
            return false;
        }
        Message message = new Message(user, instantMessageRequest.getMessage());
        conversation.addMessage(message);
        conversation.addUserIfNotPresent(recipient);
        this.messageService.saveMessage(message);
        this.conversationRepository.save(conversation);
        return true;
    }
}
