package org.theoliverlear.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

@Service
public class ScriptSocialService {
    public boolean userInSession(HttpSession session) {
        return session.getAttribute("user") != null;
    }
}
