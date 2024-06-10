package org.theoliverlear.communication.request;

import lombok.Data;

@Data
public class PostRequest {
    private Long userId;
    private String content;
}
