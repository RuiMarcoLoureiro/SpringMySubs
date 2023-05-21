package ch.hearc.springmysubs.subscription.requests;


import lombok.Data;

import java.io.Serializable;

@Data
public class UsersNotSubbedRequest implements Serializable {
    private Long subscriptionId;
}
