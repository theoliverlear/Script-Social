package org.theoliverlear.service;
//=================================-Imports-==================================
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.communication.request.WelcomeUserRequest;
import org.theoliverlear.entity.user.BirthDate;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.entity.user.personal.*;

import java.util.Optional;

@Service
public class WelcomeService {
    //============================-Variables-=================================
    private UserService userService;
    private InterestsService interestsService;
    //===========================-Constructors-===============================
    @Autowired
    public WelcomeService(UserService userService, InterestsService interestsService) {
        this.userService = userService;
        this.interestsService = interestsService;
    }
    //=============================-Methods-==================================

    //---------------Apply-Welcome-Request-User-Parameters--------------------
    public User applyWelcomeRequestUserParameters(User user, WelcomeUserRequest welcomeUserRequest) {

//        System.out.println("Employment Status: " + welcomeUserRequest.getEmploymentStatus());
//        System.out.println(welcomeUserRequest);
        // GET THE NAME
        String firstName = welcomeUserRequest.getFirstName();
        firstName = firstName.substring(0, 1).toUpperCase() + firstName.substring(1).toLowerCase();
        user.setFirstName(firstName);
        String lastName = welcomeUserRequest.getLastName();
        lastName = lastName.substring(0, 1).toUpperCase() + lastName.substring(1).toLowerCase();
        user.setLastName(lastName);
//        System.out.println(welcomeUserRequest.getFirstName() + " " + welcomeUserRequest.getLastName());
        // GET THE BIRTHDATE
        BirthDate birthDate = new BirthDate(welcomeUserRequest.getBirthDate());
        user.setBirthDate(birthDate);
        // GET THE INTERESTS
//        Interests interests = new Interests(user);
        Interests interests = user.getInterests();
//        System.out.println(welcomeUserRequest.getInterests());

//        System.out.println(interests.getInterests());
        user.setInterests(interests);
        interests.setUser(user);
        // GET THE EMPLOYMENT STATUS
        EmploymentStatus employmentStatus = new EmploymentStatus(welcomeUserRequest.getEmploymentStatus());
        user.setEmploymentStatus(employmentStatus);
        // GET THE PROFILE INTENTION
        ProfileIntention profileIntention = new ProfileIntention(welcomeUserRequest.getProfileIntention());
        user.setProfileIntention(profileIntention);
        // GET THE BIO
        user.setBio(new Bio(welcomeUserRequest.getBio()));
        // SET AS COMPLETED SURVEY
        user.setCompletedWelcomeSurvey(true);
//        System.out.println(user);
        this.userService.save(user);
        this.interestsService.saveInterests(interests);
        Optional<User> possibleUpdatedUser = this.userService.findByUsername(user.getUsername());
        if (possibleUpdatedUser.isEmpty()) {
            throw new IllegalArgumentException("Welcome Service cannot find user.");
        }
        User updatedUser = possibleUpdatedUser.get();
        Interests updatedInterests = this.interestsService.findByUserId(updatedUser);
        for (String interest : welcomeUserRequest.getInterests().split(",")) {
            updatedInterests.addInterest(new Interest(interest.trim(), interests));
        }
        this.interestsService.saveInterests(updatedInterests);
        return updatedUser;
    }

}
