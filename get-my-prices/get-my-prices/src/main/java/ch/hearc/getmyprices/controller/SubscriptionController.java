package main.java.ch.hearc.getmyprices.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    @Value("${spring.activemq.subscription-json-queue}")
    private String SUBSCRIPTION_JSON_QUEUE;

    @Autowired
    private JmsTemplate jmsTemplate;

    @Autowired
    private SubscriptionService subscriptionService;

    /*
     * TODO
     * 
     * @PostMapping(value = "/fromScraping", produces =
     * MediaType.APPLICATION_JSON_VALUE, consumes =
     * MediaType.APPLICATION_JSON_VALUE)
     * public ResponseEntity<String>
     * createSubscriptionFromScraping(@Valid @RequestBody String json) {
     * 
     * ObjectMapper mapper = new ObjectMapper();
     * String errorString = "";
     * 
     * Long subscriptionId = null;
     * 
     * try {
     * JsonNode jsonNode = mapper.readTree(json);
     * subscriptionId = jsonNode.get("subscriptionId").asLong();
     * } catch (JsonProcessingException e) {
     * errorString = "Error while parsing json";
     * }
     * }
     */

}