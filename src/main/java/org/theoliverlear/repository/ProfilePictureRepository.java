package org.theoliverlear.repository;
//=================================-Imports-==================================
import org.springframework.data.jpa.repository.JpaRepository;
import org.theoliverlear.entity.user.ProfilePicture;

public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, Long> {
    //=============================-Methods-==================================

    //--------------------------Find-By-User-Id-------------------------------
    ProfilePicture findByUserId(Long userId);
    //-------------------------Exists-By-User-Id------------------------------
    boolean existsByUserId(Long userId);
}
