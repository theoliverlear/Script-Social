package org.theoliverlear.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.entity.user.ProfilePicture;
import org.theoliverlear.repository.ProfilePictureRepository;

@Service
public class ProfilePictureService {
    ProfilePictureRepository profilePictureRepository;
    @Autowired
    public ProfilePictureService(ProfilePictureRepository profilePictureRepository) {
        this.profilePictureRepository = profilePictureRepository;
    }
    public void saveProfilePicture(ProfilePicture profilePicture) {
        this.profilePictureRepository.save(profilePicture);
    }
}
