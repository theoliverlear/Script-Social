package org.theoliverlear.communication.response;

import lombok.Data;

@Data
public class InstantMessageResponse {
    private String fullNameOrUsername;
    private Long userId;
    private String message;
    private String dateSent;
    public InstantMessageResponse(String fullNameOrUsername, Long userId, String message, String dateSent) {
        this.fullNameOrUsername = fullNameOrUsername;
        this.userId = userId;
        this.message = message;
        this.dateSent = dateSent;
    }
}
