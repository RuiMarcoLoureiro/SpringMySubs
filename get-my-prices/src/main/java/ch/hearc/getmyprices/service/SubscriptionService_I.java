package main.java.ch.hearc.getmyprices.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import main.java.ch.hearc.getmyprices.model.Subscription;

public interface SubscriptionService_I {
    public String getAllSubscriptionsPrices() throws JsonProcessingException, JsonMappingException;
}