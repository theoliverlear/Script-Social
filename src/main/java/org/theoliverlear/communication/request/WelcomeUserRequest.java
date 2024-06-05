package org.theoliverlear.communication.request;

import lombok.Data;

import java.util.List;

@Data
public class WelcomeUserRequest {
    private String firstName;
    private String lastName;
    private String birthDate;
    private String interests;
    private String employmentStatus;
    private String profileIntention;
    public WelcomeUserRequest(String firstName,
                              String lastName,
                              String birthDate,
                              String interests,
                              String employmentStatus,
                              String profileIntention) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.interests = interests;
        this.employmentStatus = employmentStatus;
        this.profileIntention = profileIntention;
    }
}
