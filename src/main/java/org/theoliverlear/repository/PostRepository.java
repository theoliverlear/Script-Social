package org.theoliverlear.repository;
//=================================-Imports-==================================
import org.springframework.data.jpa.repository.JpaRepository;
import org.theoliverlear.entity.content.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    //=============================-Methods-==================================

    //-----------------------Find-All-By-Poster-Id----------------------------
    List<Post> findAllByPosterId(Long userId);
}
