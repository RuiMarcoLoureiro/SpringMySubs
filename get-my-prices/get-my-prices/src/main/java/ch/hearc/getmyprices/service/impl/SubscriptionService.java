package main.java.ch.hearc.getmyprices.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

@Service
public class SubscriptionService implements SubscriptionService_I {

    @Override
    public String getAllSubscriptionsPrices() throws JsonProcessingException, JsonMappingException {
        RestTemplate restTemplate = new RestTemplate();

        String xml = restTemplate.getForObject("http://localhost:0000/getAllPrices", String.class); // TODO : change
        XmlMapper xmlMapper = new XmlMapper();
        Object obj = xmlMapper.readValue(xml, Object.class);
        String json = new ObjectMapper().writeValueAsString(obj);
        return json;
    }

}
