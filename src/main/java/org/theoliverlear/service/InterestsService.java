package org.theoliverlear.service;
//=================================-Imports-==================================
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.entity.user.personal.Interests;
import org.theoliverlear.model.DatabaseAccessible;
import org.theoliverlear.repository.InterestsRepository;

@Service
public class InterestsService implements DatabaseAccessible<Interests> {
    //============================-Variables-=================================
    private InterestsRepository interestsRepository;
    //===========================-Constructors-===============================
    @Autowired
    public InterestsService(InterestsRepository interestsRepository) {
        this.interestsRepository = interestsRepository;
    }
    //=============================-Methods-==================================

    //---------------------------Save-Interests-------------------------------
    public void save(Interests interests) {
        this.interestsRepository.save(interests);
    }
    public Interests update(Interests interests) {
        return this.interestsRepository.save(interests);
    }
    //--------------------------Find-By-User-Id-------------------------------
    public Interests findByUserId(User user) {
        return this.interestsRepository.findByUserId(user.getId());
    }
}
