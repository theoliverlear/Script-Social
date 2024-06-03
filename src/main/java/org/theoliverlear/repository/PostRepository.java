package org.theoliverlear.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.theoliverlear.entity.content.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
