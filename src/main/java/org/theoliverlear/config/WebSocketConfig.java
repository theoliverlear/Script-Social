package org.theoliverlear.config;
//=================================-Imports-==================================
import jakarta.servlet.http.HttpSession;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.util.Map;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    //============================-Overrides-=================================

    //----------------------Register-Stomp-Endpoints--------------------------
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").setHandshakeHandler(new DefaultHandshakeHandler() {
            public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) {
                if (request instanceof ServletServerHttpRequest servletRequest) {
                    HttpSession session = servletRequest.getServletRequest().getSession();
                    attributes.put("session", session);
                }
                return true;
            }
        }).withSockJS();
    }
    //----------------------Configure-Message-Broker--------------------------
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/messages/receiver");
        config.setApplicationDestinationPrefixes("/messages");
    }
}
