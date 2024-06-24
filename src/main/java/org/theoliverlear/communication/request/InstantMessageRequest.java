package org.theoliverlear.communication.request;

import lombok.Data;

@Data
public class InstantMessageRequest {
    private Long receiverId;
    private String message;
    public InstantMessageRequest(Long receiverId, String message) {
        this.receiverId = receiverId;
        this.message = message;
    }
}
