package org.theoliverlear.communication.response;

import lombok.Data;

@Data
public class AuthResponse {
    private boolean isAuthorized;
    private boolean completedWelcome;
    public AuthResponse(boolean isAuthorized, boolean completedWelcome) {
        this.isAuthorized = isAuthorized;
        this.completedWelcome = completedWelcome;
    }
}
