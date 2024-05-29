package org.theoliverlear.communication.response;

import lombok.Data;

@Data
public class AuthResponse {
    private boolean isAuthorized;
    public AuthResponse(boolean isAuthorized) {
        this.isAuthorized = isAuthorized;
    }
}
