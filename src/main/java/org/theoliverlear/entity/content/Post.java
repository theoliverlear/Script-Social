package org.theoliverlear.entity.content;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Post {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @ManyToOne
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
    public void addComment(Comment comment) {
        this.comments.add(comment);
    }
    @Override
    public String toString() {
        return "Post{" +
                ", poster=" + this.poster +
                ", content='" + this.content + '\'' +
                ", timePosted=" + this.timePosted +
                '}';
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
