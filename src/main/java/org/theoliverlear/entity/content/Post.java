package org.theoliverlear.entity.content;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

import java.time.LocalDateTime;
import java.util.List;

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
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    @OneToMany(mappedBy="post", cascade = CascadeType.ALL)
    private List<Comment> comments;
    @Column(name = "time_posted")
    private LocalDateTime timePosted;
    public Post() {
        this.poster = null;
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
    @Override
    public boolean equals(Object object) {
        if (object == this) {
            return true;
        }
        if (object instanceof Post comparedPost) {
            boolean samePoster = this.poster.equals(comparedPost.poster);
            boolean sameContent = this.content.equals(comparedPost.content);
            boolean sameTimePosted = this.timePosted.equals(comparedPost.timePosted);
            if (this.id == null) {
                return samePoster && sameContent && sameTimePosted;
            } else {
                boolean sameId = this.id.equals(comparedPost.id);
                return sameId && samePoster && sameContent && sameTimePosted;
            }
        }
        return false;
    }
}
