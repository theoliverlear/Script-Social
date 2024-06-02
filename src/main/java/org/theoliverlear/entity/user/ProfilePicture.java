package org.theoliverlear.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "profile_pictures")
public class ProfilePicture {
    @Id
    @GeneratedValue
    private Long id;
    @Column(name = "file_name")
    private String fileName;
    @Lob
    @Column(name = "file_data")
    private byte[] fileData;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    public ProfilePicture() {
        this.fileName = "";
        this.fileData = new byte[0];
        this.user = new User();
    }
    public ProfilePicture(String fileName, byte[] fileData, User user) {
        this.fileName = fileName;
        this.fileData = fileData;
        this.user = user;
    }
}
