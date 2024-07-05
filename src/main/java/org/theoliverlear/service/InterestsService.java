package org.theoliverlear.service;
//=================================-Imports-==================================
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.entity.user.personal.Interests;
import org.theoliverlear.repository.InterestsRepository;

@Service
public class InterestsService {
    //============================-Variables-=================================
    private InterestsRepository interestsRepository;
    //===========================-Constructors-===============================
    @Autowired
    public InterestsService(InterestsRepository interestsRepository) {
        this.interestsRepository = interestsRepository;
    }
    //=============================-Methods-==================================

    //---------------------------Save-Interests-------------------------------
    public void saveInterests(Interests interests) {
        this.interestsRepository.save(interests);
    }
    //--------------------------Find-By-User-Id-------------------------------
    public Interests findByUserId(User user) {
        return this.interestsRepository.findByUserId(user.getId());
    }
}
