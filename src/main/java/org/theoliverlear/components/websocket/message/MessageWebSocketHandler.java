package org.theoliverlear.components.websocket.message;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.theoliverlear.communication.request.InstantMessageRequest;
import org.theoliverlear.communication.response.InstantMessageResponse;
import org.theoliverlear.components.websocket.WebSocketHandler;
import org.theoliverlear.controller.SessionService;
import org.theoliverlear.entity.user.User;
import org.theoliverlear.service.ConversationService;
import org.theoliverlear.service.UserService;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Component
public class MessageWebSocketHandler extends WebSocketHandler<InstantMessageRequest, InstantMessageResponse> {
    private final UserService userService;
    private final SessionService sessionService;
    private final ConversationService conversationService;

    @Autowired
    public MessageWebSocketHandler(UserService userService,
                                   SessionService sessionService,
                                   ConversationService conversationService) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.conversationService = conversationService;
    }

    @Override
    public InstantMessageResponse makeResponse(InstantMessageRequest request) {
        log.info("Processing message request: {}", request);
        Optional<User> possibleUser = this.sessionService.getUserFromSession();
        if (possibleUser.isEmpty()) {
            log.warn("No user found in session for request: {}", request);
            return new InstantMessageResponse(
                    "Error",
                    0L,
                    "Error: User not found in session.",
                    LocalDateTime.now().toString()
            );
        } else {
            User user = possibleUser.get();
            String fullNameOrUsername = this.userService.getNameOrUsername(user);
            this.conversationService.saveMessage(request, user);
            log.info("Message saved for user: {} to user ID {}",
                    fullNameOrUsername,
                    request.getReceiverId());
            return new InstantMessageResponse(
                    fullNameOrUsername,
                    user.getId(),
                    request.getMessage(),
                    LocalDateTime.now().toString());
        }
    }
}
