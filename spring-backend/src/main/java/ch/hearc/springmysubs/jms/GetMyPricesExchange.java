package ch.hearc.springmysubs.jms;


import ch.hearc.springmysubs.subscription.responses.PriceResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.TextMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

@Service
public class GetMyPricesExchange {
    private PriceResponse lastPriceResponse = null;

    private ObjectMapper mapper;

    @Autowired
    public GetMyPricesExchange(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    /**
     * JMS listener for JSON messages
     * @param jsonMessage
     * @throws JMSException
     */
    @JmsListener(destination = "${spring.activemq.json-queue-price}")
    public void readInprogressJsonMessage(final Message jsonMessage) throws JMSException {

        System.out.println("Received message " + jsonMessage);

        if(!(jsonMessage instanceof TextMessage)) {
            return;
        }

        TextMessage textMessage = (TextMessage)jsonMessage;
        String jsonString = textMessage.getText();

        System.out.println("Received JSON message: " + jsonString);

        try {
            PriceResponse priceResponse = mapper.readValue(jsonString, PriceResponse.class);

            System.out.println("Parsed JSON message to PriceResponse object: " + priceResponse);

            // Save the last price response
            lastPriceResponse = priceResponse;


        } catch (Exception e) {
            System.err.println("Error while parsing JSON message to HttpResponse object");
        }
    }

    public PriceResponse getLastPriceResponse() {
        return lastPriceResponse;
    }
}
