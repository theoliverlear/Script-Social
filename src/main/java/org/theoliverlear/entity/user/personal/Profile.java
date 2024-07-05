package org.theoliverlear.entity.user.personal;
//=================================-Imports-==================================
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

@Getter
@Setter
@Entity
@Table(name = "profiles")
public class Profile {
    //============================-Variables-=================================
    @Id
    private Long id;
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "is_public")
    private boolean isPublic;
    @Column(name = "display_profile_intention")
    private boolean displayProfileIntention;
    @Column(name = "display_employment_status")
    private boolean displayEmploymentStatus;
    @Column(name = "display_interests")
    private boolean displayInterests;
    //===========================-Constructors-===============================
    public Profile() {
        this.isPublic = false;
        this.displayProfileIntention = false;
        this.displayEmploymentStatus = false;
        this.displayInterests = false;
        this.user = null;
    }
    public Profile(User user) {
        this.isPublic = false;
        this.displayProfileIntention = false;
        this.displayEmploymentStatus = false;
        this.displayInterests = false;
        this.user = user;
    }
    public Profile(User user,
                   boolean isPublic,
                   boolean displayProfileIntention,
                   boolean displayEmploymentStatus,
                   boolean displayInterests) {
        this.isPublic = isPublic;
        this.displayProfileIntention = displayProfileIntention;
        this.displayEmploymentStatus = displayEmploymentStatus;
        this.displayInterests = displayInterests;
        this.user = user;
    }
}
