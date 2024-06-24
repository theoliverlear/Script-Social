package org.theoliverlear.entity.im;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "conversations")
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy = "conversation", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Message> messages;
    @ManyToMany(mappedBy = "conversations", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<User> subscribers;
    public Conversation() {
        this.messages = new ArrayList<>();
        this.subscribers = new ArrayList<>();
    }
    public Conversation(List<Message> messages) {
        this.messages = messages;
        this.subscribers = new ArrayList<>();
    }
    public Conversation(List<Message> messages, List<User> subscribers) {
        this.messages = messages;
        this.subscribers = subscribers;
    }
    public void addMessage(Message message) {
        if (!this.subscribers.contains(message.getSender())) {
            this.addUserFromMessage(message);
        }
        this.messages.add(message);
    }
    public void addUserIfNotPresent(User user) {
        if (!this.subscribers.contains(user)) {
            this.subscribers.add(user);
        }
    }
    public void addUserFromMessage(Message message) {
        this.subscribers.add(message.getSender());
    }
    public boolean containsUser(User user) {
        return this.subscribers.contains(user);
    }
}
