package org.theoliverlear.service;
//=================================-Imports-==================================
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.theoliverlear.entity.user.ProfilePicture;
import org.theoliverlear.repository.ProfilePictureRepository;

@Service
public class ProfilePictureService {
    //============================-Variables-=================================
    private ProfilePictureRepository profilePictureRepository;
    //===========================-Constructors-===============================
    @Autowired
    public ProfilePictureService(ProfilePictureRepository profilePictureRepository) {
        this.profilePictureRepository = profilePictureRepository;
    }
    //=============================-Methods-==================================

    //------------------------Save-Profile-Picture----------------------------
    public void saveProfilePicture(ProfilePicture profilePicture) {
        this.profilePictureRepository.save(profilePicture);
    }
    //--------------------------Find-By-User-Id-------------------------------
    @Transactional
    public ProfilePicture findByUserId(Long userId) {
        return this.profilePictureRepository.findByUserId(userId);
    }
    //-------------------------Exists-By-User-Id------------------------------
    public boolean existsByUserId(Long userId) {
        return this.profilePictureRepository.existsByUserId(userId);
    }
}
