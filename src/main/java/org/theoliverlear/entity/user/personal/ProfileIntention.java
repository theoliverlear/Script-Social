package org.theoliverlear.entity.user.personal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class ProfileIntention {
    @Column(name = "profile_intention")
    private String profileIntention;
    @Transient
    @JsonIgnore
    public static final ProfileIntention NETWORKING = new ProfileIntention("Networking");
    @Transient
    @JsonIgnore
    public static final ProfileIntention GETTING_INVOLVED = new ProfileIntention("Getting Involved");
    @Transient
    @JsonIgnore
    public static final ProfileIntention CONNECT_TEAM = new ProfileIntention("Connect with Team");
    @Transient
    @JsonIgnore
    public static final ProfileIntention FIND_TEAM = new ProfileIntention("Find a Team");
    @Transient
    @JsonIgnore
    public static final ProfileIntention SOCIALIZE = new ProfileIntention("Socialize");
    @Transient
    @JsonIgnore
    public static final ProfileIntention JOB_SEARCH = new ProfileIntention("Job Search");
    @Transient
    @JsonIgnore
    public static final ProfileIntention LEARN = new ProfileIntention("Learn");
    public ProfileIntention() {
        this.profileIntention = ProfileIntention.SOCIALIZE.profileIntention;
    }
    public ProfileIntention(String profileIntention) {
        this.profileIntention = profileIntention;
    }
    public static ProfileIntention from(String profileIntention) {
        return switch (profileIntention) {
            case "Networking" -> ProfileIntention.NETWORKING;
            case "Getting Involved" -> ProfileIntention.GETTING_INVOLVED;
            case "Connect with Team" -> ProfileIntention.CONNECT_TEAM;
            case "Find a Team" -> ProfileIntention.FIND_TEAM;
            case "Socialize" -> ProfileIntention.SOCIALIZE;
            case "Job Search" -> ProfileIntention.JOB_SEARCH;
            case "Learn" -> ProfileIntention.LEARN;
            default -> new ProfileIntention(profileIntention);
        };
    }
    public static ProfileIntention from(ProfileIntention profileIntention) {
        return switch (profileIntention.getProfileIntention()) {
            case "Networking" -> ProfileIntention.NETWORKING;
            case "Getting Involved" -> ProfileIntention.GETTING_INVOLVED;
            case "Connect with Team" -> ProfileIntention.CONNECT_TEAM;
            case "Find a Team" -> ProfileIntention.FIND_TEAM;
            case "Socialize" -> ProfileIntention.SOCIALIZE;
            case "Job Search" -> ProfileIntention.JOB_SEARCH;
            case "Learn" -> ProfileIntention.LEARN;
            default -> new ProfileIntention(profileIntention.getProfileIntention());
        };
    }
}
