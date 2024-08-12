package org.theoliverlear.service;
//=================================-Imports-==================================
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {
    //============================-Variables-=================================
    private UserRepository userRepository;
    //===========================-Constructors-===============================
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    //=============================-Methods-==================================

    //-----------------------------Save-User----------------------------------
    public void saveUser(User user) {
        this.userRepository.save(user);
    }
    //----------------------User-Exists-By-Username---------------------------
    public boolean userExistsByUsername(String username) {
        return this.userRepository.existsByUsername(username);
    }
    //-------------------------User-Exists-By-Id------------------------------
    public boolean userExistsById(Long id) {
        return this.userRepository.existsById(id);
    }
    //------------------------Get-Current-User-Id-----------------------------
    public Long getCurrentUserId(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return null;
        } else {
            return user.getId();
        }
    }
    //--------------------------Find-By-Username------------------------------
    @Transactional
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    //------------------------Get-Current-Username----------------------------
    public String getCurrentUsername(HttpSession session) {
        // TODO: Replace with Optional<String>.
        User user = (User) session.getAttribute("user");
        return user.getUsername();
    }
    //---------------------------Get-User-By-Id-------------------------------
    @Transactional
    public Optional<User> getUserById(Long id) {
        User user = this.userRepository.findUserById(id);
        if (user == null) {
            return Optional.empty();
        } else {
            return Optional.of(user);
        }
    }
    public String getNameOrUsername(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User is null.");
        }
        String fullName = user.getFirstName() + " " + user.getLastName();
        if (fullName.equals(" ")) {
            return user.getUsername();
        } else {
            return fullName;
        }
    }
}
