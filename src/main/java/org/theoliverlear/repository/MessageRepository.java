package org.theoliverlear.repository;
//=================================-Imports-==================================
import org.springframework.data.jpa.repository.JpaRepository;
import org.theoliverlear.entity.im.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    //=============================-Methods-==================================

}
