package org.theoliverlear.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.theoliverlear.entity.user.User;

import java.util.Optional;

@Service
public class SessionService {
    private HttpSession session;

    @Autowired
    public SessionService(HttpSession session) {
        this.session = session;
    }
    //=============================-Methods-==================================

    //--------------------------User-In-Session-------------------------------
    public boolean userInSession(HttpSession session) {
        return session.getAttribute("user") != null;
    }



    public Optional<User> getUserFromSession() {
        return this.getUserFromSession(this.session);
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

    public HttpSession getSession() {
        return this.session;
    }
}
