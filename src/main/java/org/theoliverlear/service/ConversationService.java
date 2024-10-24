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
import org.theoliverlear.model.DatabaseAccessible;
import org.theoliverlear.repository.ConversationRepository;
import org.theoliverlear.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ConversationService implements DatabaseAccessible<Conversation> {
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

    public void save(Conversation conversation) {
        this.conversationRepository.save(conversation);
    }
    public Conversation update(Conversation conversation) {
        return this.conversationRepository.save(conversation);
    }

    public List<String> getConversationUsernames(Long userId) {
        List<Conversation> conversations = this.conversationRepository.findAllByUserId(userId);
        List<String> conversationsUsernames = new ArrayList<>();
        for (Conversation conversation : conversations) {
            Set<User> users = conversation.getSubscribers();
            for (User user : users) {
                if (!user.getId().equals(userId)) {
                    conversationsUsernames.add(user.getUsername());
                }
            }
        }
        return conversationsUsernames;
    }
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
        conversation = this.getManagedEntity(conversation);

        user = this.getManagedEntity(user);
        recipient = this.getManagedEntity(recipient);
        message = this.getManagedEntity(message);

        conversation.addMessage(message);
        conversation.addUser(recipient);
//        this.messageService.saveMessage(message);
//        this.conversationRepository.save(conversation);
//        this.userService.save(user);
//        this.userService.save(recipient);
        this.saveSequence(conversation, message, user, recipient);
        return true;
    }
    public <T> T getManagedEntity(T entity) {
        return this.entityManager.contains(entity) ? entity : this.entityManager.merge(entity);
    }
    //------------------------Create-Conversation-----------------------------
    @Transactional
    public Conversation createConversation(User user, User recipient) {
        user = this.updatedEntityManagerUser(user);
        Conversation conversation = Conversation.fromUsers(user, recipient);
//        this.conversationRepository.save(conversation);
//        this.userService.save(user);
//        this.userService.save(recipient);
        this.saveSequence(conversation, user, recipient);
        return conversation;
    }
    public void saveSequence(Conversation conversation, User... users) {
        Conversation updatedConversation = this.update(conversation);
        for (User user : users) {
            if (!updatedConversation.containsUser(user)) {
                updatedConversation.addUser(user);
            }
        }
        for (User user : users) {
            if (!user.containsConversation(updatedConversation)) {
                user.addConversation(updatedConversation);
            }
            this.userService.save(user);
        }
        this.save(updatedConversation);
    }
    public void saveSequence(Conversation conversation, Message message, User... users) {
        this.messageService.saveMessage(message);
        conversation = this.update(conversation);
        conversation.addMessage(message);
        message.addConversation(conversation);
        this.saveSequence(conversation, users);
    }
    public boolean conversationExists(Long... userIds) {
        boolean exists = this.findByUserIds(userIds).isPresent();
        return exists;
    }
    @Transactional
    public void saveMessage(InstantMessageRequest messageRequest, User currentUser) {

        currentUser = this.updatedEntityManagerUser(currentUser);

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
            this.saveSequence(newConversation, userMessage, currentUser, possibleRecipient.get());
        }
    }

    public User updatedEntityManagerUser(User user) {
        if (!this.entityManager.contains(user)) {
            user = this.userRepository.findById(user.getId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
        }
        return user;
    }
}
