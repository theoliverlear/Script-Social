package org.theoliverlear.service;

import org.springframework.stereotype.Service;
import org.theoliverlear.communication.request.WelcomeUserRequest;
import org.theoliverlear.entity.user.BirthDate;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.entity.user.personal.EmploymentStatus;
import org.theoliverlear.entity.user.personal.Interest;
import org.theoliverlear.entity.user.personal.Interests;
import org.theoliverlear.entity.user.personal.ProfileIntention;

@Service
public class WelcomeService {

    public User applyWelcomeRequestUserParameters(User user, WelcomeUserRequest welcomeUserRequest) {
        user.setFirstName(welcomeUserRequest.getFirstName());
        user.setLastName(welcomeUserRequest.getLastName());
        BirthDate birthDate = new BirthDate(welcomeUserRequest.getBirthDate());
        user.setBirthDate(birthDate);
        Interests interests = new Interests();
        for (String interest : welcomeUserRequest.getInterests()) {
            interests.addInterest(new Interest(interest));
        }
        user.setInterests(interests);
        EmploymentStatus employmentStatus = new EmploymentStatus(welcomeUserRequest.getEmploymentStatus());
        user.setEmploymentStatus(employmentStatus);
        ProfileIntention profileIntention = new ProfileIntention(welcomeUserRequest.getProfileIntention());
        user.setProfileIntention(profileIntention);
        return user;
    }

}
