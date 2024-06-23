package org.theoliverlear.entity.im;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

@Getter
@Setter
public class Inbox {
    @Id
    private Long id;
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
    public Inbox() {
        this.user = null;
    }
    public Inbox(User user) {
        this.user = user;
    }
}
