package ch.hearc.springmysubs.subscription.responses;

import ch.hearc.springmysubs.subscription.SubscriptionName;
import lombok.Data;

import java.io.Serializable;

public class PriceResponse implements Serializable {
    private SubscriptionName subscriptionName;
    private Double price;

    public PriceResponse() {
    }
    public PriceResponse(SubscriptionName subscriptionName, Double price) {
        this.subscriptionName = subscriptionName;
        this.price = price;
    }

    public SubscriptionName getSubscriptionName() {
        return subscriptionName;
    }

    public Double getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return "PriceResponse{" +
                "subscriptionName='" + subscriptionName + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}

