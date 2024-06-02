package org.theoliverlear.entity.user;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Embeddable
public class BirthDate {
    @Column(name = "birth_date")
    private LocalDateTime birthDate;
    public BirthDate() {
        this.birthDate = null;
    }
    public BirthDate(LocalDateTime birthDate) {
        this.birthDate = birthDate;
    }
    public BirthDate(String birthDate) {
        this.birthDate = LocalDateTime.parse(birthDate);
    }
}
