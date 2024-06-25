package junit.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.theoliverlear.config.WebSocketConfig;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = WebSocketConfig.class)
public class WebSocketConfigTest {
    @Autowired
    private ApplicationContext applicationContext;
    @Test
    public void testWebSocketConfig() {
        WebSocketConfig webSocketConfig = this.applicationContext.getBean(WebSocketConfig.class);
        assertThat(webSocketConfig).isNotNull();
    }
}
