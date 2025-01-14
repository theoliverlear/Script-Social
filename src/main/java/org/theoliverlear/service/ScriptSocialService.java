package org.theoliverlear.service;
//=================================-Imports-==================================
import jakarta.servlet.http.HttpSession;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Service;
import org.theoliverlear.entity.user.User;

import java.util.Map;
import java.util.Optional;

@Service
public class ScriptSocialService {
    //=============================-Methods-==================================

    public boolean sessionUserIdMatches(HttpSession session, Long id) {
        Optional<User> possibleUser = this.getUserFromSession(session);
        return possibleUser.map(user -> user.getId().equals(id)).orElse(false);
    }

    //--------------------------User-In-Session-------------------------------
    public boolean userInSession(HttpSession session) {
        return session.getAttribute("user") != null;
    }
    //-----------------------Get-User-From-Session----------------------------
    public Optional<User> getUserFromSession(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return Optional.empty();
        } else {
            return Optional.of(user);
        }
    }
    public void setSessionUser(HttpSession session, User user) {
        session.setAttribute("user", user);
    }
    public void removeSessionUser(HttpSession session) {
        session.removeAttribute("user");
    }
    //-----------------------Get-User-From-Session----------------------------
    public Optional<User> getUserFromSession(SimpMessageHeaderAccessor headerAccessor) {
        if (headerAccessor.getSessionAttributes() == null) {
            return Optional.empty();
        }
        Map<String, Object> attributes = headerAccessor.getSessionAttributes();
        return this.getUserFromSession((HttpSession) attributes.get("session"));
    }
    //--------------------Get-Session-From-Attributes-------------------------
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
    //--------------------------User-In-Session-------------------------------
    public boolean userInSession(SimpMessageHeaderAccessor headerAccessor) {
        Optional<HttpSession> possibleSession = this.getSessionFromAttributes(headerAccessor);
        return possibleSession.filter(this::userInSession).isPresent();
    }
    //------------------------Get-Redirect-Address----------------------------
    public String getRedirectAddress(String pageName) {
        return "redirect:/" + pageName + "/";
    }
}
