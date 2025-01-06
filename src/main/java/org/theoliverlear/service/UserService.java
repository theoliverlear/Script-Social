package org.theoliverlear.service;
//=================================-Imports-==================================
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.model.DatabaseAccessible;
import org.theoliverlear.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService implements DatabaseAccessible<User> {
    //============================-Variables-=================================
    private UserRepository userRepository;
    //===========================-Constructors-===============================
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    //=============================-Methods-==================================

    //-----------------------------Save-User----------------------------------
    public void save(User user) {
        this.userRepository.save(user);
    }
    //----------------------------Update-User---------------------------------
    public User update(User user) {
        return this.userRepository.save(user);
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
    public Optional<User> findByUsername(String username) {
        User user = this.userRepository.findByUsername(username);
        if (user == null) {
            return Optional.empty();
        } else {
            return Optional.of(user);
        }
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
    @Transactional
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
    @Transactional
    public String getNameOrUsername(User user, User currentUser) {
        if (user == null) {
            throw new IllegalArgumentException("User is null.");
        }
        if (user.equals(currentUser)) {
            return "You";
        }
        return this.getNameOrUsername(user);
    }
}
