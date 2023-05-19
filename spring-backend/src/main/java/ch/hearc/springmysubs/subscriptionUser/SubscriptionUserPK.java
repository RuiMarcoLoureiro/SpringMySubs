package ch.hearc.springmysubs.subscriptionUser;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable // JPA annotations (composite key)
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionUserPK implements Serializable {
    @Column(name = "subscription_id")
    private Long subscriptionId;

    @Column(name = "user_id")
    private Long userId;
}
