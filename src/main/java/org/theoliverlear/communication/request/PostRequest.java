package org.theoliverlear.communication.request;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class PostRequest {
    //============================-Variables-=================================
    private Long userId;
    private String content;
    //===========================-Constructors-===============================
    public PostRequest(Long userId, String content) {
        this.userId = userId;
        this.content = content;
    }
}
