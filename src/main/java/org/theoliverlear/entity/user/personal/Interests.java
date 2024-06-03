package org.theoliverlear.entity.user.personal;

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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "user_id")
    @OneToOne
    User user;
    @OneToMany(mappedBy = "interests", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public List<Interest> interests;
    public Interests() {
        this.interests = new ArrayList<>();
    }
    public Interests(List<Interest> interests) {
        this.interests = interests;
    }
    public void addInterest(Interest interest) {
        this.interests.add(interest);
    }
    public void removeInterest(Interest interest) {
        this.interests.remove(interest);
    }
}
