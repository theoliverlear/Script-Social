package org.theoliverlear.entity.content;
//=================================-Imports-==================================
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostPicture extends Picture {
    //============================-Variables-=================================
    @OneToOne
    @JoinColumn(name = "post_id")
    private Post post;
    //===========================-Constructors-===============================
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
    //=============================-Setters-==================================

    //---------------------------Set-File-Name--------------------------------
    public void setFileName(String fileName) {
        super.setFileName(fileName);
    }
}
