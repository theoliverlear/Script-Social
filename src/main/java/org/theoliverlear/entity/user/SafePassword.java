package org.theoliverlear.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Transient;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Embeddable
public class SafePassword {
    String encodedPassword;
    @Transient
    @JsonIgnore
    BCryptPasswordEncoder encoder;
    public SafePassword() {
        this.encodedPassword = "";
        this.encoder = new BCryptPasswordEncoder();
    }
    public SafePassword(String unencodedPassword) {
        this.encoder = new BCryptPasswordEncoder();
        this.encodedPassword = this.encodePassword(unencodedPassword);
    }
    public String encodePassword(String unencodedPassword) {
        return this.encoder.encode(unencodedPassword);
    }
    public boolean compareUnencodedPassword(String unencodedPassword) {
        return this.encoder.matches(unencodedPassword, this.encodedPassword);
    }
}
