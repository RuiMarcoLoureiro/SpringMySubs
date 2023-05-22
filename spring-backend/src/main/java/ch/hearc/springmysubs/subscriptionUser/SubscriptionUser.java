package ch.hearc.springmysubs.subscriptionUser;

import ch.hearc.springmysubs.shared.BaseEntity;
import ch.hearc.springmysubs.subscription.Subscription;
import ch.hearc.springmysubs.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"user", "subscription"})
@EqualsAndHashCode(callSuper = true) // Take into account the parent attributes in equals and hashcode
public class SubscriptionUser extends BaseEntity {
    @EmbeddedId // JPA annotations (composite key)
    private SubscriptionUserPK id;

    @NotNull
    private Boolean accepted = true;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("user_id") // user_id is the name of the attribute in the SubscriptionUserPK class
    @JoinColumn(name = "user_id", nullable = false) // user_id is the name of the column in the table subscriptions_users
    @EqualsAndHashCode.Exclude
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("subscription_id") // subscription_id is the name of the attribute in the SubscriptionUserPK class
    @JoinColumn(name = "subscription_id", nullable = false) // subscription_id is the name of the column in the table subscriptions_users
    @EqualsAndHashCode.Exclude
    private Subscription subscription;

    public SubscriptionUser(User user, Subscription subscription) {
        this.user = user;
        this.subscription = subscription;
        this.id = new SubscriptionUserPK(subscription.getId(), user.getId());
    }

}