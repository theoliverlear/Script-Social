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
    //===========================-Constructors-===============================
    public BirthDate() {
        this.birthDate = null;
    }
    public BirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
    public BirthDate(String birthDate) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("EEE MMM dd yyyy");
        this.birthDate = LocalDate.parse(birthDate, dateFormatter);
    }
}
