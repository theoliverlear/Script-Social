package org.theoliverlear.communication.request;

import lombok.Data;

@Data
public class WelcomeCompletedRequest {
    private Long userId;
    public WelcomeCompletedRequest(Long userId) {
        this.userId = userId;
    }
}
