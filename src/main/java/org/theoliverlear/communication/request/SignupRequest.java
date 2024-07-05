package org.theoliverlear.communication.request;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class SignupRequest {
    //============================-Variables-=================================
    private String email;
    private String username;
    private String password;
    //===========================-Constructors-===============================
    public SignupRequest(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
