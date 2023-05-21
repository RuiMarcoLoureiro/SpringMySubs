package ch.hearc.springmysubs.subscription.responses;

import ch.hearc.springmysubs.subscription.SubscriptionDTO;
import ch.hearc.springmysubs.subscriptionUser.SubscriptionUserDTO;
import ch.hearc.springmysubs.user.UserDTO;
import lombok.Data;

import java.io.Serializable;

@Data
public class UsersNotSubbedResponse implements Serializable {
    private SubscriptionDTO subscription;
    private SubscriptionUserDTO subscriptionUser;
    private UserDTO user;

    public UsersNotSubbedResponse(SubscriptionDTO subscription, SubscriptionUserDTO subscriptionUser, UserDTO user) {
        this.subscription = subscription;
        this.subscriptionUser = subscriptionUser;
        this.user = user;
    }
}
