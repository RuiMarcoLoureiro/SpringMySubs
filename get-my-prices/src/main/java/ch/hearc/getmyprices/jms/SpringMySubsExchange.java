package ch.hearc.getmyprices.jms;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.TextMessage;
import org.springframework.stereotype.Service;

@Service
public class SpringMySubsExchange {
    private final ObjectMapper mapper;

    @Autowired
    public SpringMySubsExchange(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    /**
     * Listener jms avec conversion json
     * @param jsonMessage
     * @throws JMSException
     */
    @JmsListener(destination = "${spring.activemq.json-queue}")
    public void readInprogressJsonMessage(final Message jsonMessage) throws JMSException {

        System.out.println("Received json-q message " + jsonMessage);

        if(jsonMessage instanceof TextMessage) {
            // json encoded string
            TextMessage textMessage = (TextMessage)jsonMessage;
            String messageData = textMessage.getText();

            try {
                // convert json string to object
                PriceRequest message = mapper.readValue(messageData, PriceRequest.class);

                System.out.println(message);

                // TODO : call the service to get the price

            } catch (Exception e) {
                System.out.println("Error while reading json message");
            }
        }

    }
}
