package org.theoliverlear.controller;

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
import java.io.IOException;

@Controller
@RequestMapping("/upload")
public class UploadController {
    private final ProfilePictureService profilePictureService;
    @Autowired
    public UploadController(ProfilePictureService profilePictureService) {
        this.profilePictureService = profilePictureService;
    }
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
            this.profilePictureService.saveProfilePicture(profilePicture);
            return new ResponseEntity<>(new OperationSuccessfulResponse(true), HttpStatus.OK);
        } catch (IOException ex) {
            return new ResponseEntity<>(new OperationSuccessfulResponse(false), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
