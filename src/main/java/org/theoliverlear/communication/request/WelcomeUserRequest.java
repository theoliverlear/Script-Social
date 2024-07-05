package org.theoliverlear.communication.request;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class WelcomeUserRequest {
    //============================-Variables-=================================
    private String firstName;
    private String lastName;
    private String birthDate;
    private String interests;
    private String employmentStatus;
    private String profileIntention;
    private String bio;
    //===========================-Constructors-===============================
    public WelcomeUserRequest(String firstName,
                              String lastName,
                              String birthDate,
                              String interests,
                              String employmentStatus,
                              String profileIntention,
                              String bio) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.interests = interests;
        this.employmentStatus = employmentStatus;
        this.profileIntention = profileIntention;
        this.bio = bio;
    }
}
