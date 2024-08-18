package org.theoliverlear.service;
//=================================-Imports-==================================
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.theoliverlear.communication.request.InstantMessageRequest;
import org.theoliverlear.entity.im.Conversation;
import org.theoliverlear.entity.im.Message;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.repository.ConversationRepository;
import org.theoliverlear.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {
    //============================-Variables-=================================
    private ConversationRepository conversationRepository;
    private MessageService messageService;
    private UserService userService;
    private EntityManager entityManager;
    private UserRepository userRepository;
    //===========================-Constructors-===============================
    @Autowired
    public ConversationService(ConversationRepository conversationRepository,
                               MessageService messageService,
                               UserService userService,
                               EntityManager entityManager,
                               UserRepository userRepository) {
        this.conversationRepository = conversationRepository;
        this.messageService = messageService;
        this.userService = userService;
        this.entityManager = entityManager;
        this.userRepository = userRepository;
    }
    //=============================-Methods-==================================

    //--------------------------Find-By-User-Ids------------------------------
    public Optional<Conversation> findByUserIds(Long... userIds) {
        List<Long> userIdsList = List.of(userIds);
        Conversation conversation = this.conversationRepository.findByUserIds(userIdsList);
        if (conversation == null) {
            return Optional.empty();
        } else {
            return Optional.of(conversation);
        }
    }
    //--------------------------Find-By-User-Ids------------------------------
    public Optional<Conversation> findByUserIds(List<Long> userIds) {
        Conversation conversation = this.conversationRepository.findByUserIds(userIds);
        if (conversation == null) {
            return Optional.empty();
        } else {
            return Optional.of(conversation);
        }
    }
    //--------------------Add-Message-To-Conversation-------------------------
    @Transactional
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
    //------------------------Create-Conversation-----------------------------
    @Transactional
    public Conversation createConversation(User user, User recipient) {
        if (!this.entityManager.contains(user)) {
            user = this.userRepository.findById(user.getId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
        }
        Conversation conversation = new Conversation();
        conversation.addUser(user);
        conversation.addUser(recipient);
        this.conversationRepository.save(conversation);
        this.userService.saveUser(user);
        this.userService.saveUser(recipient);
        return conversation;
    }
    public void saveConversation(Conversation conversation) {
        this.conversationRepository.save(conversation);
    }
    public boolean conversationExists(Long... userIds) {
        boolean exists = this.findByUserIds(userIds).isPresent();
        return exists;
    }
    @Transactional
    public void saveMessage(InstantMessageRequest messageRequest, User currentUser) {

        if (!this.entityManager.contains(currentUser)) {
            currentUser = this.userRepository.findById(currentUser.getId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
        }

        boolean conversationExists = this.conversationExists(currentUser.getId(), messageRequest.getReceiverId());
        if (conversationExists) {
            Optional<Conversation> possibleConversation = this.findByUserIds(currentUser.getId(), messageRequest.getReceiverId());
            if (possibleConversation.isEmpty()) {
                throw new IllegalArgumentException("Conversation does not exist.");
            }
            Conversation conversation = possibleConversation.get();
            this.addMessageToConversation(conversation, currentUser, messageRequest);
        } else {
            Optional<User> possibleRecipient = this.userService.getUserById(messageRequest.getReceiverId());
            if (possibleRecipient.isEmpty()) {
                throw new IllegalArgumentException("Recipient does not exist.");
            }
            Conversation newConversation = this.createConversation(currentUser, possibleRecipient.get());
            Message userMessage = new Message(currentUser, messageRequest.getMessage());
            newConversation.addMessage(userMessage);
        }
    }
}
