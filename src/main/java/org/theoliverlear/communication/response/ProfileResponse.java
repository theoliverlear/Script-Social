package org.theoliverlear.communication.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class ProfileResponse {
    boolean isMe;
    public ProfileResponse(boolean isMe) {
        this.isMe = isMe;
    }
}
