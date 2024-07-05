package org.theoliverlear.entity.content;
//=================================-Imports-==================================
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    //============================-Variables-=================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User poster;
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    @OneToMany(mappedBy="post", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Comment> comments;
    @Column(name = "time_posted")
    private LocalDateTime timePosted;
    //===========================-Constructors-===============================
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
    //=============================-Methods-==================================

    //----------------------------Add-Comment---------------------------------
    public void addComment(Comment comment) {
        this.comments.add(comment);
    }
    //============================-Overrides-=================================

    //------------------------------To-String---------------------------------
    @Override
    public String toString() {
        return "Post{" +
                ", poster=" + this.poster +
                ", content='" + this.content + '\'' +
                ", timePosted=" + this.timePosted +
                '}';
    }
    //------------------------------Equals------------------------------------
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
