package ch.hearc.springmysubs.subscriptionUser;

import lombok.Data;

import java.io.Serializable;

@Data
public class SubscriptionUserDTO implements Serializable {
    private Boolean accepted;
}
