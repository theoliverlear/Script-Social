package org.theoliverlear.controller;
//=================================-Imports-==================================
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.theoliverlear.communication.response.OperationSuccessfulResponse;
import org.theoliverlear.entity.user.ProfilePicture;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.service.ProfilePictureService;
import org.theoliverlear.service.UserService;

import java.io.IOException;

@Controller
@RequestMapping("/upload")
public class UploadController {
    //============================-Variables-=================================
    private ProfilePictureService profilePictureService;
    private UserService userService;
    //===========================-Constructors-===============================
    @Autowired
    public UploadController(ProfilePictureService profilePictureService,
                            UserService userService) {
        this.profilePictureService = profilePictureService;
        this.userService = userService;
    }
    //=============================-Methods-==================================

    //-----------------------Upload-Profile-Picture---------------------------
    // TODO: Add profile/banner/ endpoint
    @RequestMapping("/profile/picture")
    public ResponseEntity<OperationSuccessfulResponse> uploadProfilePicture(@RequestParam("file") MultipartFile file, HttpSession session) {
        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser == null) {
            return new ResponseEntity<>(new OperationSuccessfulResponse(false), HttpStatus.UNAUTHORIZED);
        }
        String fileName = file.getOriginalFilename();
        try {
            byte[] fileData = file.getBytes();
            ProfilePicture profilePicture = new ProfilePicture(fileName, fileData, sessionUser);
            sessionUser.setProfilePicture(profilePicture);
            profilePicture.setUser(sessionUser);
            this.profilePictureService.saveProfilePicture(profilePicture);
            this.userService.saveUser(sessionUser);
            return new ResponseEntity<>(new OperationSuccessfulResponse(true), HttpStatus.OK);
        } catch (IOException ex) {
            return new ResponseEntity<>(new OperationSuccessfulResponse(false), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
