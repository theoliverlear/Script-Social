package org.theoliverlear.entity.user;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.Post;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @AttributeOverride(
            name = "encodedPassword",
            column = @Column(name = "password"))
    @Embedded
    private SafePassword safePassword;
    /*
    TODO: Add top programming languages
    TODO: Add top frameworks
    TODO: Make Profile Class which contains information about what the user is and has displayed
     */
    @OneToMany(mappedBy = "poster", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    List<Post> posts;
    public User() {
        this.username = "";
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.safePassword = new SafePassword();
    }
    public User(String username, String unencodedPassword) {
        this.username = username;
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.safePassword = new SafePassword(unencodedPassword);
    }
    public User(String username, String email, String firstName, String lastName, SafePassword safePassword) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.safePassword = safePassword;
    }
    public User(String username, String email, String firstName, String lastName, SafePassword safePassword, List<Post> posts) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.safePassword = safePassword;
        this.posts = posts;
    }
}
