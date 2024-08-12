package org.theoliverlear.repository;
//=================================-Imports-==================================
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.theoliverlear.entity.im.Conversation;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    //=============================-Methods-==================================

    //--------------------------Find-By-User-Ids------------------------------
    @Query("SELECT c FROM Conversation c JOIN c.subscribers u WHERE u.id IN :userIds")
    Conversation findByUserIds(List<Long> userIds);
//    @Query("SELECT c FROM Conversation c JOIN c.subscribers u WHERE u.id IN :userIds")
//    Conversation findByUserIds(Long... userIds);
    // Possible alternative query:
    // List<Conversation> findBySubscribers_IdIn(List<Long> userIds);
}
