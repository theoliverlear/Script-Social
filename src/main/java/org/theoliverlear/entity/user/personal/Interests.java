package org.theoliverlear.entity.user.personal;
//=================================-Imports-==================================
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.theoliverlear.entity.user.User;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "interest_ids")
public class Interests {
    //============================-Variables-=================================
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "user_id")
    @OneToOne
    private User user;
    @OneToMany(mappedBy = "interests", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Interest> interests;
    //===========================-Constructors-===============================
    public Interests() {
        this.interests = new ArrayList<>();
    }
    public Interests(User user) {
        this.user = user;
        this.interests = new ArrayList<>();
    }
    public Interests(List<Interest> interests) {
        this.interests = interests;
    }
    //=============================-Methods-==================================

    //----------------------------Add-Interest--------------------------------
    public void addInterest(Interest interest) {
        this.interests.add(interest);
    }
    //--------------------------Remove-Interest-------------------------------
    public void removeInterest(Interest interest) {
        this.interests.remove(interest);
    }
}
