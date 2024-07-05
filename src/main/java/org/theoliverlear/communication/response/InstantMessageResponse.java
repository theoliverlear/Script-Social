package org.theoliverlear.communication.response;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class InstantMessageResponse {
    //============================-Variables-=================================
    private String fullNameOrUsername;
    private Long userId;
    private String message;
    private String dateSent;
    //===========================-Constructors-===============================
    public InstantMessageResponse(String fullNameOrUsername, Long userId, String message, String dateSent) {
        this.fullNameOrUsername = fullNameOrUsername;
        this.userId = userId;
        this.message = message;
        this.dateSent = dateSent;
    }
}
