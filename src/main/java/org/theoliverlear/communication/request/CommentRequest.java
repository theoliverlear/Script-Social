package org.theoliverlear.communication.request;

import lombok.Data;

@Data
public class CommentRequest {
    private Long userId;
    private Long postId;
    private String content;
    public CommentRequest(Long userId, Long postId, String content) {
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }
}
