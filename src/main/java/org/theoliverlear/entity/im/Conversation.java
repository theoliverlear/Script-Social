package org.theoliverlear.entity.im;
//=================================-Imports-==================================
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

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
    @OneToMany(mappedBy = "conversation", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Message> messages;
    @ManyToMany(mappedBy = "conversations", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Set<User> subscribers;
    //===========================-Constructors-===============================
    public Conversation() {
        this.messages = new ArrayList<>();
        this.subscribers = new HashSet<>();
    }
    public Conversation(List<Message> messages) {
        this.messages = messages;
        this.subscribers = new HashSet<>();
    }
    public Conversation(List<Message> messages, HashSet<User> subscribers) {
        this.messages = messages;
        this.subscribers = subscribers;
    }
    //=============================-Methods-==================================

    //----------------------------Add-Message---------------------------------
    public void addMessage(Message message) {
        if (!this.subscribers.contains(message.getSender())) {
            this.addUserFromMessage(message);
        }
        this.messages.add(message);
    }
    //------------------------------Add-User----------------------------------
    public void addUser(User user) {
        this.addUserIfNotPresent(user);
        user.addConversation(this);
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
}
