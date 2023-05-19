package ch.hearc.springmysubs.subscriptionUser;

import ch.hearc.springmysubs.subscription.Subscription;
import ch.hearc.springmysubs.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class SubscriptionUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Boolean accepted = false;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false) // user_id is the name of the column in the table subscriptions_users
    private User users;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subscription_id", nullable = false) // subscription_id is the name of the column in the table subscriptions_users
    private Subscription subscriptions;

}