package org.theoliverlear.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.content.Post;
import org.theoliverlear.entity.user.personal.EmploymentStatus;
import org.theoliverlear.entity.user.personal.Interests;
import org.theoliverlear.entity.user.personal.Profile;
import org.theoliverlear.entity.user.personal.ProfileIntention;

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
    // TODO: Add bio to welcome section and say "Tell us about yourself". Make
    //       it optional. Maybe include favorite languages with bubble choices
    //       by images of the logos.
    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;
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
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Profile profile;
    @OneToMany(mappedBy = "poster", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    List<Post> posts;
    @Column(name = "completed_welcome_survey")
    private boolean completedWelcomeSurvey;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "interests_id")
    private Interests interests;
    @Embedded
    BirthDate birthDate;
    @Embedded
    ProfileIntention profileIntention;
    @Embedded
    EmploymentStatus employmentStatus;
    @OneToOne
    @JoinColumn(name = "profile_picture_id")
    private ProfilePicture profilePicture;
    public User() {
        this.username = "";
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.safePassword = new SafePassword();
        this.profile = new Profile();
    }
    public User(String username, String unencodedPassword) {
        this.username = username;
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.safePassword = new SafePassword(unencodedPassword);
        this.profile = new Profile();
    }
    public User(String username, String email, String firstName, String lastName, SafePassword safePassword) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.safePassword = safePassword;
        this.profile = new Profile();
    }
    public User(String username, String email, String firstName, String lastName, SafePassword safePassword, List<Post> posts) {
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.safePassword = safePassword;
        this.posts = posts;
        this.profile = new Profile();
    }
    @Override
    public String toString() {
        return "User{" +
                ", username='" + this.username + '\'' +
                ", email='" + this.email + '\'' +
                ", firstName='" + this.firstName + '\'' +
                ", lastName='" + this.lastName + '\'' +
                ", completedWelcomeSurvey=" + this.completedWelcomeSurvey +
                ", interests=" + this.interests +
                ", birthDate=" + this.birthDate +
                '}';
    }
}
