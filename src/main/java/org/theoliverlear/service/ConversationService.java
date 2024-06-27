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
//        if (conversation == null) {
//            conversation = this.createConversation(user, this.userService.getUserById(instantMessageRequest.getReceiverId()).get());
//            return true;
//        }
        Long recipientId = instantMessageRequest.getReceiverId();
        Optional<User> possibleRecipient = this.userService.getUserById(recipientId);
        if (possibleRecipient.isEmpty()) {
            return false;
        }
        User recipient = possibleRecipient.get();
        Message message = new Message(user, instantMessageRequest.getMessage());
        conversation.addMessage(message);
        conversation.addUser(recipient);
        this.messageService.saveMessage(message);
        this.conversationRepository.save(conversation);
        this.userService.saveUser(user);
        this.userService.saveUser(recipient);
        return true;
    }
    public Conversation createConversation(User user, User recipient) {
        Conversation conversation = new Conversation();
        conversation.addUser(user);
        conversation.addUser(recipient);
        this.conversationRepository.save(conversation);
        this.userService.saveUser(user);
        this.userService.saveUser(recipient);
        return conversation;
    }
}
