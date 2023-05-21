package ch.hearc.springmysubs.subscription.responses;

import ch.hearc.springmysubs.subscription.SubscriptionName;
import lombok.Data;

import java.io.Serializable;

@Data
public class PriceResponse implements Serializable {
    private SubscriptionName subscriptionName;
    private Double price;
}
