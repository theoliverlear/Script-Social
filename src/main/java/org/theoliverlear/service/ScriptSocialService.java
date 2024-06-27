package org.theoliverlear.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;
import org.theoliverlear.entity.user.User;

import java.util.Map;
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
    public Optional<User> getUserFromSession(SimpMessageHeaderAccessor headerAccessor) {
        if (headerAccessor.getSessionAttributes() == null) {
            return Optional.empty();
        }
        Map<String, Object> attributes = headerAccessor.getSessionAttributes();
        return this.getUserFromSession((HttpSession) attributes.get("session"));
    }
    public Optional<HttpSession> getSessionFromAttributes(SimpMessageHeaderAccessor headerAccessor) {
        if (headerAccessor.getSessionAttributes() == null) {
            return Optional.empty();
        }
        Map<String, Object> attributes = headerAccessor.getSessionAttributes();
        if (attributes.containsKey("session")) {
            HttpSession session = (HttpSession) attributes.get("session");
            return Optional.of(session);
        } else {
            return Optional.empty();
        }
    }
    public boolean userInSession(SimpMessageHeaderAccessor headerAccessor) {
        Optional<HttpSession> possibleSession = this.getSessionFromAttributes(headerAccessor);
        return possibleSession.filter(this::userInSession).isPresent();
    }
}
