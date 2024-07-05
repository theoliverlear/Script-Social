package org.theoliverlear.entity.user.personal;
//=================================-Imports-==================================
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Bio {
    //============================-Variables-=================================
    @Column(name = "bio_text", columnDefinition = "TEXT")
    private String bioText;
    //===========================-Constructors-===============================
    public Bio() {
        this.bioText = "";
    }
    public Bio(String bioText) {
        this.bioText = bioText;
    }
}
