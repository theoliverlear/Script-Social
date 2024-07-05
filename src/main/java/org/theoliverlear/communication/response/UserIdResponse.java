package org.theoliverlear.communication.response;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class UserIdResponse {
    //============================-Variables-=================================
    private Long userId;
    //===========================-Constructors-===============================
    public UserIdResponse(Long userId) {
        this.userId = userId;
    }
}
