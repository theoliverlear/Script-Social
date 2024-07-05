package org.theoliverlear.entity.user;
//=================================-Imports-==================================
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Transient;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Embeddable
public class SafePassword {
    //============================-Variables-=================================
    private String encodedPassword;
    @Transient
    @JsonIgnore
    private BCryptPasswordEncoder encoder;
    //===========================-Constructors-===============================
    public SafePassword() {
        this.encodedPassword = "";
        this.encoder = new BCryptPasswordEncoder();
    }
    public SafePassword(String unencodedPassword) {
        this.encoder = new BCryptPasswordEncoder();
        this.encodedPassword = this.encodePassword(unencodedPassword);
    }
    //=============================-Methods-==================================

    //--------------------------Encode-Password-------------------------------
    public String encodePassword(String unencodedPassword) {
        return this.encoder.encode(unencodedPassword);
    }
    //---------------------Compare-Unencoded-Password-------------------------
    public boolean compareUnencodedPassword(String unencodedPassword) {
        return this.encoder.matches(unencodedPassword, this.encodedPassword);
    }
}
