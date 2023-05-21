package ch.hearc.springmysubs.subscription.requests;

import lombok.Data;

import java.io.Serializable;

@Data
public class UsersSubbedRequest implements Serializable {
    private Long subscriptionId;
}
