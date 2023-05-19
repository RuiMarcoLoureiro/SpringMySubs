package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.category.Category;
import ch.hearc.springmysubs.subscriptionUser.SubscriptionUser;
import ch.hearc.springmysubs.period.Period;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 255)
    @NotNull
    private String name;

    @NotNull
    private Double cost;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "periods_id", nullable = false)
    private Period periods;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "categories_id", nullable = false)
    private Category categories;

    /*
     * fetch = FetchType.EAGER : load all the data when loading the role
     */
    @OneToMany(mappedBy = "subscriptions", fetch = FetchType.EAGER)
    private Set<SubscriptionUser> subscriptionUsers = new LinkedHashSet<>();

}