package org.theoliverlear.service;
//=================================-Imports-==================================
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.communication.request.WelcomeUserRequest;
import org.theoliverlear.entity.user.BirthDate;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.entity.user.personal.*;
import org.theoliverlear.model.TitleFormatter;

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
        firstName = TitleFormatter.formatTitleCase(firstName);
        user.setFirstName(firstName);
        String lastName = welcomeUserRequest.getLastName();
        lastName = TitleFormatter.formatTitleCase(lastName);
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
        Interests updatedInterests = this.interestsService.update(interests);
        Optional<User> possibleUpdatedUser = this.userService.findByUsername(user.getUsername());
        if (possibleUpdatedUser.isEmpty()) {
            throw new IllegalArgumentException("Welcome Service cannot find user.");
        }
        User updatedUser = possibleUpdatedUser.get();
        String[] interestStringArray = welcomeUserRequest.getInterests().split(",");
        for (String interest : interestStringArray) {
            String interestString = interest.trim();
            updatedInterests.addInterest(new Interest(interestString, updatedInterests));
        }
        this.interestsService.save(updatedInterests);
        return updatedUser;
    }
}
