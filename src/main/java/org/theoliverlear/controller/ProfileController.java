package org.theoliverlear.controller;
//=================================-Imports-==================================
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
import org.theoliverlear.entity.user.personal.Bio;
import org.theoliverlear.service.ProfilePictureService;
import org.theoliverlear.service.ScriptSocialService;

import java.util.Optional;

@RequestMapping("/profile")
@Controller
public class ProfileController {
    //============================-Variables-=================================
    private ScriptSocialService scriptSocialService;
    private ProfilePictureService profilePictureService;
    //===========================-Constructors-===============================
    @Autowired
    public ProfileController(ScriptSocialService scriptSocialService,
                             ProfilePictureService profilePictureService) {
        this.scriptSocialService = scriptSocialService;
        this.profilePictureService = profilePictureService;
    }
    //=============================-Methods-==================================

    //------------------------------Profile-----------------------------------
    @RequestMapping("/")
    public String profile(HttpSession session, Model model) {
        if (session.getAttribute("user") == null) {
            return "redirect:/";
        }
        Optional<User> possibleUser = this.scriptSocialService.getUserFromSession(session);
        if (possibleUser.isPresent()) {
            User currentUser = possibleUser.get();
            this.scriptSocialService.setSessionUser(session, currentUser);
            model.addAttribute("username", currentUser.getUsername());
        }
        return "profile";
    }
    //-----------------------------Profile-Id---------------------------------
    @RequestMapping("/{id}")
    public String profileId(HttpSession session, @PathVariable String id, Model model) {
        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser == null) {
            return "redirect:/";
        }
        model.addAttribute("userId", id);
        return "profile";
    }
    //----------------------------Get-Profile---------------------------------
    @RequestMapping("/get/{id}")
    public ResponseEntity<ProfileResponse> getProfile(@PathVariable String id, HttpSession session, Model model) {
        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (sessionUser.getId().toString().equals(id)) {
            if (sessionUser.getBio() == null) {
                sessionUser.setBio(new Bio());
            }
            model.addAttribute("username", sessionUser.getUsername());
            return ResponseEntity.ok(new ProfileResponse(sessionUser.getFirstName(), sessionUser.getLastName(),
                    sessionUser.getBio().getBioText(), true));
        } else {
            return ResponseEntity.ok(new ProfileResponse("John", "Doe",
                    "Hello, World!", false));
        }
    }
    //------------------------Has-Profile-Picture-----------------------------
    @RequestMapping("/get/{id}/has-profile-picture")
    public ResponseEntity<HasProfilePictureResponse> hasProfilePicture(@PathVariable String id) {
        boolean hasProfilePicture = this.profilePictureService.existsByUserId(Long.parseLong(id));
        return ResponseEntity.ok(new HasProfilePictureResponse(hasProfilePicture));
    }
    //------------------------Get-Profile-Picture-----------------------------
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
