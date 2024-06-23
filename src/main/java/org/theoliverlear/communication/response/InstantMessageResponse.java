package org.theoliverlear.communication.response;

import lombok.Data;

@Data
public class InstantMessageResponse {
    private String fullNameOrUsername;
    private String message;
    private String dateSent;
    private boolean isSeen;
    public InstantMessageResponse(String fullNameOrUsername, String message, String dateSent, boolean isSeen) {
        this.fullNameOrUsername = fullNameOrUsername;
        this.message = message;
        this.dateSent = dateSent;
        this.isSeen = isSeen;
    }
}
