package org.theoliverlear.entity.content;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "posts")
public class Post {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User poster;
    private String content;
    private LocalDateTime timePosted;
    public Post() {
        this.poster = new User();
        this.content = "";
        this.timePosted = LocalDateTime.now();
    }
    public Post(User poster, String content) {
        this.poster = poster;
        this.content = content;
        this.timePosted = LocalDateTime.now();
    }
    public Post(User poster, String content, LocalDateTime timePosted) {
        this.poster = poster;
        this.content = content;
        this.timePosted = timePosted;
    }
}
