package ch.hearc.springmysubs.subscription.requests;

import ch.hearc.springmysubs.subscription.SubscriptionName;

import java.io.Serializable;

public class PriceRequest implements Serializable {
    private SubscriptionName subscriptionName;

    public PriceRequest() {
    }

    public PriceRequest(SubscriptionName subscriptionName) {
        this.subscriptionName = subscriptionName;
    }

    public SubscriptionName getSubscriptionName() {
        return subscriptionName;
    }

    public void setSubscriptionName(SubscriptionName subscriptionName) {
        this.subscriptionName = subscriptionName;
    }

    @Override
    public String toString() {
        return "PriceRequest{" +
                "subscriptionName=" + subscriptionName +
                '}';
    }
}
