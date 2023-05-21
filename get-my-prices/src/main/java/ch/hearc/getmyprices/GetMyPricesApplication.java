package ch.hearc.getmyprices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class GetMyPricesApplication {

	public static void main(String[] args) {
		SpringApplication.run(GetMyPricesApplication.class, args);
	}

	@Bean
	public WebClient localApiClient() {
		return WebClient.create("http://localhost:5000");
	}
}
