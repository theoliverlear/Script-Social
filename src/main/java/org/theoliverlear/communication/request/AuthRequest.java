package org.theoliverlear.communication.request;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class AuthRequest {
    //============================-Variables-=================================
    private String username;
    private String password;
    //===========================-Constructors-===============================
    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
