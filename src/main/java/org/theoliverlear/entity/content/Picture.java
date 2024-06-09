package org.theoliverlear.entity.content;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "file_name")
    private String fileName;
    @Column(name = "file_type")
    private String fileType;
    @Lob
    @Column(name = "file_data")
    private byte[] fileData;
    public Picture() {
        this.fileName = "";
        this.fileData = new byte[0];
    }
    public Picture(String fileName, byte[] fileData) {
        this.fileName = fileName;
        this.fileData = fileData;
        this.fetchFileType();
    }
    public void fetchFileType() {
        String fileExtension = this.fileName.substring(this.fileName.lastIndexOf(".") + 1);
        switch (fileExtension) {
            case "jpg", "jpeg" -> this.fileType = "image/jpeg";
            case "png" -> this.fileType = "image/png";
            case "gif" -> this.fileType = "image/gif";
            case "bmp" -> this.fileType = "image/bmp";
            case "webp" -> this.fileType = "image/webp";
            case "svg" -> this.fileType = "image/svg+xml";
            default -> throw new IllegalArgumentException("Invalid file type");
        }
    }
    public void setFileName(String fileName) {
        this.fileName = fileName;
        this.fetchFileType();
    }
}
