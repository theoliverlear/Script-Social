package org.theoliverlear.communication.response;

import lombok.Data;

@Data
public class InstantMessageResponse {
    private String fullNameOrUsername;
    private String message;
    private String dateSent;
    public InstantMessageResponse(String fullNameOrUsername, String message, String dateSent) {
        this.fullNameOrUsername = fullNameOrUsername;
        this.message = message;
        this.dateSent = dateSent;
    }
}
