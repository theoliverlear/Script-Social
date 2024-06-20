package org.theoliverlear.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.entity.user.personal.Interests;
import org.theoliverlear.repository.InterestsRepository;

@Service
public class InterestsService {
    private InterestsRepository interestsRepository;
    @Autowired
    public InterestsService(InterestsRepository interestsRepository) {
        this.interestsRepository = interestsRepository;
    }
    public void saveInterests(Interests interests) {
        this.interestsRepository.save(interests);
    }
    public Interests findByUserId(Interests interests) {
        return this.interestsRepository.findByUserId(interests.getUser().getId());
    }
    public Interests findByUserId(User user) {
        return this.interestsRepository.findByUserId(user.getId());
    }
}
