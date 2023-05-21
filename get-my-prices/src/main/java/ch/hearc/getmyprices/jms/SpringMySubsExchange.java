package ch.hearc.getmyprices.jms;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.jms.annotation.JmsListener;
import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.TextMessage;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class SpringMySubsExchange {
    private final ObjectMapper mapper;

    private final WebClient localApiClient;
    private final JmsTemplate jmsTemplate;

    @Autowired
    public SpringMySubsExchange(ObjectMapper mapper, WebClient localApiClient, JmsTemplate jmsTemplate) {
        this.mapper = mapper;
        this.localApiClient = localApiClient;
        this.jmsTemplate = jmsTemplate;
    }

    /**
     * Listener jms avec conversion json
     * @param jsonMessage
     * @throws JMSException
     */
    @JmsListener(destination = "queue-subscription")
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

                Double price = localApiClient.get()
                        .uri("/getPrice/{service}", message.getSubscriptionName())
                        .retrieve()
                        .bodyToMono(Double.class)
                        .block();

                System.out.println(price);

                // send price to the queue
                jmsTemplate.convertAndSend("queue-price", new PriceResponse(message.getSubscriptionName(), price));

            } catch (Exception e) {
                System.out.println("Error while reading json message");
            }
        }

    }
}
