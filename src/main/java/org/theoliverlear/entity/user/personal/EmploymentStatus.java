package org.theoliverlear.entity.user.personal;
//=================================-Imports-==================================
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class EmploymentStatus {
    //============================-Variables-=================================
    @Column(name = "employment_status")
    private String employmentStatus;
    //============================-Constants-=================================
    @Transient
    @JsonIgnore
    public static final EmploymentStatus INDEPENDENT = new EmploymentStatus("Independent");
    @Transient
    @JsonIgnore
    public static final EmploymentStatus EMPLOYED = new EmploymentStatus("Employed");
    @Transient
    @JsonIgnore
    public static final EmploymentStatus SEEKING_EMPLOYMENT = new EmploymentStatus("Seeking Employment");
    @Transient
    @JsonIgnore
    public static final EmploymentStatus STUDENT = new EmploymentStatus("Student");
    @Transient
    @JsonIgnore
    public static final EmploymentStatus HOBBYIST = new EmploymentStatus("Hobbyist");
    @Transient
    @JsonIgnore
    public static final EmploymentStatus BUILDING_TEAM = new EmploymentStatus("Building Team");
    //===========================-Constructors-===============================
    public EmploymentStatus() {
        this.employmentStatus = EmploymentStatus.INDEPENDENT.employmentStatus;
    }
    public EmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }
    //=============================-Methods-==================================

    //--------------------------------From------------------------------------
    public static EmploymentStatus from(String employmentStatus) {
        return switch (employmentStatus) {
            case "Independent" -> EmploymentStatus.INDEPENDENT;
            case "Employed" -> EmploymentStatus.EMPLOYED;
            case "Seeking Employment" -> EmploymentStatus.SEEKING_EMPLOYMENT;
            case "Student" -> EmploymentStatus.STUDENT;
            case "Hobbyist" -> EmploymentStatus.HOBBYIST;
            case "Building Team" -> EmploymentStatus.BUILDING_TEAM;
            default -> new EmploymentStatus(employmentStatus);
        };
    }
    //--------------------------------From------------------------------------
    public static EmploymentStatus from(EmploymentStatus employmentStatus) {
        return from(employmentStatus.getEmploymentStatus());
    }
}
