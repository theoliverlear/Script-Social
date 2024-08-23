package org.theoliverlear.entity.im;
//=================================-Imports-==================================
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "conversations")
public class Conversation {
    //============================-Variables-=================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy = "conversation", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Message> messages;
    @ManyToMany(mappedBy = "conversations", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    private Set<User> subscribers;
    @Column(name = "last_message_time")
    private LocalDateTime lastMessageTime;
    //===========================-Constructors-===============================
    public Conversation() {
        this.messages = new HashSet<>();
        this.subscribers = new HashSet<>();
        this.lastMessageTime = LocalDateTime.now();
    }
    public Conversation(Set<Message> messages) {
        this.messages = messages;
        this.subscribers = new HashSet<>();
        this.lastMessageTime = LocalDateTime.now();
    }
    public Conversation(Set<Message> messages, Set<User> subscribers) {
        this.messages = messages;
        this.subscribers = subscribers;
        this.lastMessageTime = LocalDateTime.now();
    }
    public Conversation(Set<Message> messages, Set<User> subscribers, LocalDateTime lastMessageTime) {
        this.messages = messages;
        this.subscribers = subscribers;
        this.lastMessageTime = lastMessageTime;
    }
    //=======================-Factory-Constructors-===========================
    public static Conversation fromUsers(User... users) {
        Conversation conversation = new Conversation();
        for (User user : users) {
            conversation.addUserIfNotPresent(user);
        }
        return conversation;
    }
    //=============================-Methods-==================================

    //----------------------------Add-Message---------------------------------
    public void addMessage(Message message) {
        if (!this.subscribers.contains(message.getSender())) {
            this.addUserFromMessage(message);
        }
        this.messages.add(message);
        this.updateTimeFromMessage(message);
    }
    public void updateTimeFromMessage(Message message) {
        if (message.getDateSent().isAfter(this.lastMessageTime)) {
            this.lastMessageTime = message.getDateSent();
        }
    }
    //------------------------------Add-User----------------------------------
    public void addUser(User user) {
        this.addUserIfNotPresent(user);
        user.addConversationIfNotPresent(this);
    }
    //----------------------Add-User-If-Not-Present---------------------------
    public void addUserIfNotPresent(User user) {
        // TODO: Phase out method when hashcode and equals are implemented.
        //       This will phase out the need for checking for duplicates,
        //       since it is a set.
        if (!this.subscribers.contains(user)) {
            this.subscribers.add(user);
        }
    }
    //-----------------------Add-User-From-Message----------------------------
    public void addUserFromMessage(Message message) {
        this.subscribers.add(message.getSender());
    }
    //---------------------------Contains-User--------------------------------
    public boolean containsUser(User user) {
        return this.subscribers.contains(user);
    }
    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object instanceof Conversation comparedConversation) {
            if (this.id != null) {
                return this.id.equals(comparedConversation.getId());
            } else {
                boolean messagesEqual = this.messages.equals(comparedConversation.getMessages());
                boolean subscribersEqual = this.subscribers.equals(comparedConversation.getSubscribers());
                return messagesEqual && subscribersEqual;
            }
        }
        return false;
    }
}
