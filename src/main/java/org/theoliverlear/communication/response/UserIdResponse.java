package org.theoliverlear.communication.response;

import lombok.Data;

@Data
public class UserIdResponse {
    private Long userId;
    public UserIdResponse(Long userId) {
        this.userId = userId;
    }
}
