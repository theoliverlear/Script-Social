package org.theoliverlear.communication.request;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class InstantMessageRequest {
    //============================-Variables-=================================
    private Long receiverId;
    private String message;
    //===========================-Constructors-===============================
    public InstantMessageRequest(Long receiverId, String message) {
        this.receiverId = receiverId;
        this.message = message;
    }
}
