package org.theoliverlear.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.theoliverlear.entity.user.personal.Interests;

public interface InterestsRepository extends JpaRepository<Interests, Long> {
    Interests findByUserId(Long userId);
}
