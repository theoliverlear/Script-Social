package org.theoliverlear.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.theoliverlear.entity.im.Conversation;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    @Query("SELECT c FROM Conversation c JOIN c.subscribers u WHERE u.id IN :userIds")
    List<Conversation> findByUserIds(List<Long> userIds);
    // Possible alternative query:
    // List<Conversation> findBySubscribers_IdIn(List<Long> userIds);
}
