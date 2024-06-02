package org.theoliverlear.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.theoliverlear.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
