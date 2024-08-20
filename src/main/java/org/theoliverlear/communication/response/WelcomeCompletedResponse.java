package org.theoliverlear.communication.response;

import lombok.Data;

@Data
public class WelcomeCompletedResponse {
    private boolean welcomeCompleted;
    public WelcomeCompletedResponse(boolean welcomeCompleted) {
        this.welcomeCompleted = welcomeCompleted;
    }
}
