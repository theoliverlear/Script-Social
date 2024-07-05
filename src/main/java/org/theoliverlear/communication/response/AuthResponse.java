package org.theoliverlear.communication.response;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class AuthResponse {
    //============================-Variables-=================================
    private boolean isAuthorized;
    private boolean completedWelcome;
    //===========================-Constructors-===============================
    public AuthResponse(boolean isAuthorized, boolean completedWelcome) {
        this.isAuthorized = isAuthorized;
        this.completedWelcome = completedWelcome;
    }
}
