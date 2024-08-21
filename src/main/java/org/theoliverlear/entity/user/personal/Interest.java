package org.theoliverlear.entity.user.personal;
//=================================-Imports-==================================
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "interests")
@Entity
public class Interest {
    //============================-Variables-=================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "interest_title")
    private String interestTitle;
    @ManyToOne
    @JoinColumn(name = "interests_id")
    private Interests interests;
    //============================-Constants-=================================
    @Transient
    @JsonIgnore
    public static final Interest SOFTWARE_DEVELOPMENT = new Interest("Software Development");
    @Transient
    @JsonIgnore
    public static final Interest WEB_DEVELOPMENT = new Interest("Web Development");
    @Transient
    @JsonIgnore
    public static final Interest MOBILE_DEVELOPMENT = new Interest("Mobile Development");
    @Transient
    @JsonIgnore
    public static final Interest DATABASE_MANAGEMENT = new Interest("Database Management");
    @Transient
    @JsonIgnore
    public static final Interest CYBERSECURITY = new Interest("Cybersecurity");
    @Transient
    @JsonIgnore
    public static final Interest DATA_SCIENCE = new Interest("Data Science");
    @Transient
    @JsonIgnore
    public static final Interest GAME_DEVELOPMENT = new Interest("Game Development");
    @Transient
    @JsonIgnore
    public static final Interest TEAM_BUILDING = new Interest("Team Building");
    @Transient
    @JsonIgnore
    public static final Interest PROJECT_MANAGEMENT = new Interest("Project Management");
    @Transient
    @JsonIgnore
    public static final Interest ARTIFICIAL_INTELLIGENCE = new Interest("Artificial Intelligence");
    //===========================-Constructors-===============================
    public Interest() {
        this.interestTitle = null;
    }
    public Interest(String interestTitle) {
        this.interestTitle = interestTitle;
    }
    public Interest(String interestTitle, Interests interests) {
        this.interestTitle = interestTitle;
        this.interests = interests;
    }
    //============================-Overrides-=================================

    //------------------------------Equals------------------------------------
    @Override
    public boolean equals(Object object) {
        if (object == this) {
            return true;
        }
        if (object instanceof Interest interest) {
            return this.interestTitle.equals(interest.interestTitle);
        }
        return false;
    }
    //------------------------------Hash-Code---------------------------------
    @Override
    public int hashCode() {
        return this.interestTitle.hashCode();
    }
}
