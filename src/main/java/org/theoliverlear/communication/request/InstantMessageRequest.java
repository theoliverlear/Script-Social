package org.theoliverlear.communication.request;

import lombok.Data;

@Data
public class InstantMessageRequest {
    private Long senderId;
    private Long receiverId;
    private String message;
    public InstantMessageRequest(Long senderId, Long receiverId, String message) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message;
    }
}
