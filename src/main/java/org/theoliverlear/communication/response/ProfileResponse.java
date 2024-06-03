package org.theoliverlear.communication.response;

import lombok.Data;

@Data
public class ProfileResponse {
    String firstName;
    String lastName;
    boolean isMe;
    public ProfileResponse(String firstName, String lastName, boolean isMe) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.isMe = isMe;
    }
}
