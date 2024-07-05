package org.theoliverlear.repository;
//=================================-Imports-==================================
import org.springframework.data.jpa.repository.JpaRepository;
import org.theoliverlear.entity.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
    //=============================-Methods-==================================

    //-------------------------Exists-By-Username-----------------------------
    boolean existsByUsername(String username);
    //--------------------------Find-By-Username------------------------------
    User findByUsername(String username);
    //---------------------------Find-By-Email--------------------------------
    User findByEmail(String email);
    //-------------------------Finder-User-By-Id------------------------------
    User findUserById(Long id);
}
