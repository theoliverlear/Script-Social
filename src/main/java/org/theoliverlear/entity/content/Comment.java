package org.theoliverlear.entity.content;
//=================================-Imports-==================================
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "comments")
public class Comment {
    //============================-Variables-=================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User commenter;
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    @Column(name = "time_posted")
    private LocalDateTime timePosted;
    //===========================-Constructors-===============================
    public Comment() {
        this.commenter = null;
        this.content = "";
        this.timePosted = LocalDateTime.now();
    }
    public Comment(User commenter, String content) {
        this.commenter = commenter;
        this.content = content;
        this.timePosted = LocalDateTime.now();
    }
    public Comment(User commenter, String content, LocalDateTime timePosted) {
        this.commenter = commenter;
        this.content = content;
        this.timePosted = timePosted;
    }
}
