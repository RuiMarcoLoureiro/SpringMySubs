package ch.hearc.jms;

import javax.jms.TextMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@Component
public class JmsMessageProducer implements CommandLineRunner{

	
	@Autowired
	JmsTemplate jmsTemplate;
	
	@Override
	public void run(String... args) throws Exception {
		
		System.out.println("Starting message production...");
		
		while(true) {
			
			Thread.sleep(1000);
			
			jmsTemplate.convertAndSend("json-q", new HelloWorldMessage("World","Le monde"));
			
			
			jmsTemplate.send("txt-q", messageCreator -> {
                TextMessage message = messageCreator.createTextMessage();
                message.setText("youp-yop");
                return message;
            });
			
			System.out.println("Iteration done");
		}
		
	}

	
}
