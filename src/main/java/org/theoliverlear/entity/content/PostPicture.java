package org.theoliverlear.entity.content;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostPicture extends Picture {
    @OneToOne
    @JoinColumn(name = "post_id")
    private Post post;
    public PostPicture() {
        super();
        this.post = null;
    }
    public PostPicture(String fileName, byte[] fileData) {
        super(fileName, fileData);
        this.post = null;
    }
    public PostPicture(String fileName, byte[] fileData, Post post) {
        super(fileName, fileData);
        this.post = post;
    }
    public void setFileName(String fileName) {
        super.setFileName(fileName);
    }
}
