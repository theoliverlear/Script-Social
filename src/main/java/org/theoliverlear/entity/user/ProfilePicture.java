package org.theoliverlear.entity.user;
//=================================-Imports-==================================
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.content.Picture;

@Getter
@Setter
@Entity
@Table(name = "profile_pictures")
public class ProfilePicture extends Picture {
    //============================-Variables-=================================
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    //===========================-Constructors-===============================
    public ProfilePicture() {
        super();
        this.user = null;
    }
    public ProfilePicture(User user) {
        super();
        this.user = user;
    }
    public ProfilePicture(String fileName, byte[] fileData) {
        super(fileName, fileData);
        this.user = null;
    }
    public ProfilePicture(String fileName, byte[] fileData, User user) {
        super(fileName, fileData);
        this.user = user;
    }
    //=============================-Setters-==================================

    //---------------------------Set-File-Name--------------------------------
    public void setFileName(String fileName) {
        super.setFileName(fileName);
    }
}
