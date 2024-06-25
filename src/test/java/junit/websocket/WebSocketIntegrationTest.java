package junit.websocket;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.theoliverlear.ScriptSocialApplication;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = ScriptSocialApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class WebSocketIntegrationTest {

    private WebSocketStompClient stompClient;
    private StompSession stompSession;
    private BlockingQueue<String> blockingQueue;

    @BeforeEach
    public void setup() throws Exception {
        this.blockingQueue = new LinkedBlockingQueue<>();
        this.stompClient = new WebSocketStompClient(new StandardWebSocketClient());
        this.stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        // Connect to WebSocket
        this.stompSession = this.stompClient.connect("ws://localhost:8080/ws", new StompSessionHandlerAdapter() {
            @Override
            public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
                System.out.println("Connected to WebSocket");
            }

            @Override
            public void handleTransportError(StompSession session, Throwable exception) {
                System.err.println("Transport error: " + exception.getMessage());
            }
        }).get(5, TimeUnit.SECONDS);

        if (this.stompSession == null || !this.stompSession.isConnected()) {
            throw new IllegalStateException("Failed to connect to WebSocket");
        }
    }

    @Test
    public void testWebSocket() throws Exception {
        this.stompSession.subscribe("/message/receiver", new StompSessionHandlerAdapter() {
            @Override
            public void handleFrame(StompHeaders headers, Object payload) {
                blockingQueue.add(payload.toString());
            }
        });
        this.stompSession.send("/message/send", "Hello");
        String message = this.blockingQueue.poll(5, TimeUnit.SECONDS);
        assertThat(message).isEqualTo("Hello");
    }
}
