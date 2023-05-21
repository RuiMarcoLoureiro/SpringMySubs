package ch.hearc.springmysubs.subscriptionUser;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable // JPA annotations (composite key)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class SubscriptionUserPK implements Serializable {
    @Column(name = "subscription_id")
    private Long subscriptionId;

    @Column(name = "user_id")
    private Long userId;
}
