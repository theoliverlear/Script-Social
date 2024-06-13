package org.theoliverlear.communication.response;

import lombok.Data;

@Data
public class ProfileResponse {
    private String firstName;
    private String lastName;
    private String bio;
    private boolean isMe;
    public ProfileResponse(String firstName, String lastName,
                           String bio, boolean isMe) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
        this.isMe = isMe;
    }
}
