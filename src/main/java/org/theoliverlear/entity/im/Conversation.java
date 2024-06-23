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
    private List<User> conversationSubscribers;
    public Conversation() {
        this.messages = new ArrayList<>();
        this.conversationSubscribers = new ArrayList<>();
    }
    public Conversation(List<Message> messages) {
        this.messages = messages;
        this.conversationSubscribers = new ArrayList<>();
    }
    public Conversation(List<Message> messages, List<User> conversationSubscribers) {
        this.messages = messages;
        this.conversationSubscribers = conversationSubscribers;
    }
    public void addMessage(Message message) {
        if (!this.conversationSubscribers.contains(message.getSender())) {
            this.addUserFromMessage(message);
        }
        this.messages.add(message);
    }
    public void addUserFromMessage(Message message) {
        this.conversationSubscribers.add(message.getSender());
    }
    public boolean containsUser(User user) {
        return this.conversationSubscribers.contains(user);
    }
}
