package org.theoliverlear.entity.im;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "sender_id")
    private User sender;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;
    @Column(name = "message")
    private String message;
    @Column(name = "date_sent")
    private LocalDateTime dateSent;
    // TODO: Add encryption to messages.
    public Message() {
        this.sender = null;
        this.message = "";
        this.dateSent = LocalDateTime.now();
    }
    public Message(User sender, String message) {
        this.sender = sender;
        this.message = message;
        this.dateSent = LocalDateTime.now();
    }
    public Message(User sender, String message, LocalDateTime dateSent) {
        this.sender = sender;
        this.message = message;
        this.dateSent = dateSent;
    }

}
