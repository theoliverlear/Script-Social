package org.theoliverlear.entity.user.personal;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Bio {
    @Column(name = "bio_text", columnDefinition = "TEXT")
    String bioText;
    public Bio() {
        this.bioText = "";
    }
    public Bio(String bioText) {
        this.bioText = bioText;
    }
}
