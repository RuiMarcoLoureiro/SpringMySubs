package ch.hearc.springmysubs.subscription;

import lombok.Data;

import java.io.Serializable;

@Data
public class SubscriptionDTO implements Serializable {
    private String name;
    private Double cost;
}
