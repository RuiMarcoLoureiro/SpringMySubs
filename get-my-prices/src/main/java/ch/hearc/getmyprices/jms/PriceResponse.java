package ch.hearc.getmyprices.jms;

import java.io.Serializable;

public class PriceResponse implements Serializable {
    private SubscriptionName subscriptionName;
    private Double price;

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
