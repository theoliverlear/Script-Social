package org.theoliverlear.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.theoliverlear.entity.user.User;

import java.util.Optional;

@Service
public class ScriptSocialService {
    public boolean userInSession(HttpSession session) {
        return session.getAttribute("user") != null;
    }
    public Optional<User> getUserFromSession(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return Optional.empty();
        } else {
            return Optional.of(user);
        }
    }
}
