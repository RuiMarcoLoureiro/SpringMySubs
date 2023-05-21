package ch.hearc.springmysubs.subscription.requests;

import ch.hearc.springmysubs.subscription.SubscriptionName;
import lombok.Data;

import java.io.Serializable;

@Data
public class PriceRequest implements Serializable {
    private SubscriptionName subscriptionName;
}
