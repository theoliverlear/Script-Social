package org.theoliverlear.service;

import org.springframework.stereotype.Service;
import org.theoliverlear.communication.request.WelcomeUserRequest;
import org.theoliverlear.entity.user.BirthDate;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.entity.user.personal.*;

@Service
public class WelcomeService {

    public User applyWelcomeRequestUserParameters(User user, WelcomeUserRequest welcomeUserRequest) {
        // TODO: Make NameFormatter.java class to implement uppercase and
        //       lowercase functionality.
        System.out.println("Employment Status: " + welcomeUserRequest.getEmploymentStatus());
        System.out.println(welcomeUserRequest);
        String firstName = welcomeUserRequest.getFirstName();
        firstName = firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase();
        user.setFirstName(firstName);
        String lastName = welcomeUserRequest.getLastName();
        lastName = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();
        user.setLastName(lastName);
        System.out.println(welcomeUserRequest.getFirstName() + " " + welcomeUserRequest.getLastName());
        BirthDate birthDate = new BirthDate(welcomeUserRequest.getBirthDate());
        user.setBirthDate(birthDate);
        Interests interests = new Interests();
        for (String interest : welcomeUserRequest.getInterests().split(",")) {
            interests.addInterest(new Interest(interest.trim()));
            System.out.println(interest.trim());
        }
        user.setInterests(interests);
        interests.setUser(user);
        EmploymentStatus employmentStatus = new EmploymentStatus(welcomeUserRequest.getEmploymentStatus());
        user.setEmploymentStatus(employmentStatus);
        ProfileIntention profileIntention = new ProfileIntention(welcomeUserRequest.getProfileIntention());
        user.setProfileIntention(profileIntention);
        user.setBio(new Bio(welcomeUserRequest.getBio()));
        user.setCompletedWelcomeSurvey(true);
        System.out.println(user);
        return user;
    }

}
