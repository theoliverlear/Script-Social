package org.theoliverlear.repository;
//=================================-Imports-==================================
import org.springframework.data.jpa.repository.JpaRepository;
import org.theoliverlear.entity.user.personal.Interests;

public interface InterestsRepository extends JpaRepository<Interests, Long> {
    //=============================-Methods-==================================

    //--------------------------Find-By-User-Id-------------------------------
    Interests findByUserId(Long userId);
}
