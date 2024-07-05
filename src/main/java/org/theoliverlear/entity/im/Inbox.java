package org.theoliverlear.entity.im;
//=================================-Imports-==================================
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

@Getter
@Setter
public class Inbox {
    //============================-Variables-=================================
    @Id
    private Long id;
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
    // TODO: Reevaluate purpose of class either as a container for
    //       conversations or a container for unread messages.
    //===========================-Constructors-===============================
    public Inbox() {
        this.user = null;
    }
    public Inbox(User user) {
        this.user = user;
    }
}
