package org.theoliverlear.service;
//=================================-Imports-==================================
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.entity.im.Message;
import org.theoliverlear.repository.MessageRepository;

@Service
public class MessageService {
    //============================-Variables-=================================
    private MessageRepository messageRepository;
    //===========================-Constructors-===============================
    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }
    //=============================-Methods-==================================

    //----------------------------Save-Message--------------------------------
    public void saveMessage(Message message) {
        this.messageRepository.save(message);
    }
}
