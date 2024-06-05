package org.theoliverlear.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.theoliverlear.communication.response.HasProfilePictureResponse;
import org.theoliverlear.communication.response.ProfileResponse;
import org.theoliverlear.entity.user.ProfilePicture;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.service.ProfilePictureService;

@RequestMapping("/profile")
@Controller
public class ProfileController {
    private ProfilePictureService profilePictureService;
    @Autowired
    public ProfileController(ProfilePictureService profilePictureService) {
        this.profilePictureService = profilePictureService;
    }
    @RequestMapping("/")
    public String profile(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return "redirect:/";
        }
        return "profile";
    }
    @RequestMapping("/{id}")
    public String profileId(HttpSession session, @PathVariable String id, Model model) {
        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser == null) {
           return "redirect:/";
        }
        model.addAttribute("userId", id);
        return "profile";
    }
    @RequestMapping("/get/{id}")
    public ResponseEntity<ProfileResponse> getProfile(@PathVariable String id, HttpSession session, Model model) {
        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (sessionUser.getId().toString().equals(id)) {
            model.addAttribute("username", sessionUser.getUsername());
            return ResponseEntity.ok(new ProfileResponse(sessionUser.getFirstName(), sessionUser.getLastName(), true));
        } else {
            return ResponseEntity.ok(new ProfileResponse("John", "Doe", false));
        }
    }
    @RequestMapping("/get/{id}/has-profile-picture")
    public ResponseEntity<HasProfilePictureResponse> hasProfilePicture(@PathVariable String id) {
        boolean hasProfilePicture = this.profilePictureService.existsByUserId(Long.parseLong(id));
        return ResponseEntity.ok(new HasProfilePictureResponse(hasProfilePicture));
    }
    @Transactional
    @RequestMapping("/get/{id}/profile-picture")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable String id) {
        ProfilePicture profilePicture = this.profilePictureService.findByUserId(Long.parseLong(id));
        if (profilePicture == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            byte[] imageData = profilePicture.getFileData();
            String fileType = profilePicture.getFileType();
            return ResponseEntity.ok().contentType(MediaType.parseMediaType(fileType)).body(imageData);
        }
    }
}
