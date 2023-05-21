package ch.hearc.jms;

import java.util.logging.Level;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.TextMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.JmsListener;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class DemoApplication {

	@Autowired
	ObjectMapper mapper;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	/**
	 * Listener jms de message texte
	 * 
	 * @param jsonMessage
	 * @throws JMSException
	 */
	@JmsListener(destination = "${spring.activemq.txt-queue}")
	public void readInProgressTxTMessage(final Message textMessage) throws JMSException {

		System.out.println("Received txt-q message " + textMessage);

		String message = ((TextMessage) textMessage).getText();
		System.out.println(message);

	}

	/**
	 * Listener jms avec conversion json
	 * 
	 * @param jsonMessage
	 * @throws JMSException
	 */
	@JmsListener(destination = "${spring.activemq.json-queue}")
	public void readInprogressJsonMessage(final Message jsonMessage) throws JMSException {

		String messageData = null;

		System.out.println("Received json-q message " + jsonMessage);

		if (jsonMessage instanceof TextMessage) {
			HelloWorldMessage message = null;

			TextMessage textMessage = (TextMessage) jsonMessage;
			messageData = textMessage.getText();

			try {
				message = mapper.readValue(messageData, HelloWorldMessage.class);

				System.out.println(message);

			} catch (Exception e) {
				System.out.println("error converting to cart");
			}
			System.out.println("messageData:" + messageData);
		}

	}

}
