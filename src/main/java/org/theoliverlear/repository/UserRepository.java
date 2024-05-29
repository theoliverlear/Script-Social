package org.theoliverlear.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.theoliverlear.entity.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    User findByUsername(String username);
    User findByEmail(String email);
}
