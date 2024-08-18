package junit.entity.im;

import org.junit.jupiter.api.Test;
import org.theoliverlear.entity.im.Conversation;
import org.theoliverlear.entity.im.Message;
import org.theoliverlear.entity.user.User;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ConversationTest {
    private User testUserOne = new User("testUserOne", "password");
    private User testUserTwo = new User("testUserTwo", "password");
    @Test
    public void testSubscriberSize() {
        Conversation testConversation = new Conversation();
        testConversation.addUser(this.testUserOne);
        testConversation.addUser(this.testUserTwo);
        assertEquals(2, testConversation.getSubscribers().size());
        testConversation.addUser(this.testUserOne);
        assertEquals(2, testConversation.getSubscribers().size());
    }
    @Test
    public void testAddMessage() {
        Conversation testConversation = new Conversation();
        testConversation.addUser(this.testUserOne);
        testConversation.addUser(this.testUserTwo);
        Message testMessage = new Message(this.testUserOne, "Hello, world!");
        testConversation.addMessage(testMessage);
        assertEquals(1, testConversation.getMessages().size());
        assertEquals("Hello, world!", testConversation.getMessages().get(0).getMessage());
        assertEquals(this.testUserOne, testConversation.getMessages().get(0).getSender());
    }
}
