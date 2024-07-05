package org.theoliverlear.communication.request;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class CommentRequest {
    //============================-Variables-=================================
    private Long userId;
    private Long postId;
    private String content;
    //===========================-Constructors-===============================
    public CommentRequest(Long userId, Long postId, String content) {
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }
}
