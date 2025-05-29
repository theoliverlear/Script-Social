package org.theoliverlear.components.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.lang.reflect.ParameterizedType;

public abstract class WebSocketHandler<Request, Response> extends TextWebSocketHandler {
    @Autowired
    protected ObjectMapper objectMapper;
    @SuppressWarnings( "unchecked")
    private final Class<Request> requestClass = (Class<Request>)
                                                ((ParameterizedType) getClass()
                                                                    .getGenericSuperclass())
                                                                    .getActualTypeArguments()[0];


    @Override
    public void handleTextMessage(WebSocketSession session,
                                           TextMessage message) throws IOException {
        String payload = message.getPayload();
        Request request = this.parseRequest(payload);
        Response response = this.makeResponse(request);
        String responseJson = this.convertResponseToJson(response);
        session.sendMessage(new TextMessage(responseJson));
    }

    public Request parseRequest(String payload) {
        try {
            return this.objectMapper.readValue(payload, this.requestClass);
        } catch (JsonProcessingException exception) {
            throw new RuntimeException("Invalid request payload: " + payload, exception);
        }
    }

    public abstract Response makeResponse(Request request);

    public String convertResponseToJson(Response response) {
        try {
            return this.objectMapper.writeValueAsString(response);
        } catch (JsonProcessingException exception) {
            throw new RuntimeException("Failed to serialize response", exception);
        }
    }
}
