package org.theoliverlear.entity.user;
//=================================-Imports-==================================
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@Embeddable
public class BirthDate {
    //============================-Variables-=================================
    @Column(name = "birth_date")
    private LocalDate birthDate;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("EEE MMM dd yyyy");
    //===========================-Constructors-===============================
    public BirthDate() {
        this.birthDate = null;
    }
    public BirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
    public BirthDate(String birthDate) {
        this.birthDate = LocalDate.parse(birthDate, DATE_FORMATTER);
    }
}
