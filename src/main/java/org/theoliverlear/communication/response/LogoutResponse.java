package org.theoliverlear.communication.response;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class LogoutResponse {
    //============================-Variables-=================================
    private boolean isLoggedOut;
    //===========================-Constructors-===============================
    public LogoutResponse(boolean isLoggedOut) {
        this.isLoggedOut = isLoggedOut;
    }
}
