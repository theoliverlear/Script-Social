package org.theoliverlear.communication.response;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class AuthResponse {
    //============================-Variables-=================================
    private boolean isAuthorized;
    //===========================-Constructors-===============================
    public AuthResponse(boolean isAuthorized) {
        this.isAuthorized = isAuthorized;
    }
}
