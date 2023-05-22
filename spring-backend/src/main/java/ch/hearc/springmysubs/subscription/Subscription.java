package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.category.Category;
import ch.hearc.springmysubs.shared.BaseEntity;
import ch.hearc.springmysubs.subscriptionUser.SubscriptionUser;
import ch.hearc.springmysubs.period.Period;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"period", "category", "subscriptionUsers"})
@EqualsAndHashCode(callSuper = true) // Take into account the parent attributes in equals and hashcode
public class Subscription extends BaseEntity {
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
    @JoinColumn(name = "period_id", nullable = false)
    @EqualsAndHashCode.Exclude
    private Period period;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    @EqualsAndHashCode.Exclude
    private Category category;

    /*
     * fetch = FetchType.EAGER : load all the data when loading the role
     */
    @OneToMany(
            mappedBy = "subscription", // subscription is the name of the attribute in the SubscriptionUser class
            fetch = FetchType.EAGER, // load all the data when loading the role
            cascade =  {
                    CascadeType.MERGE, CascadeType.REMOVE
            }, // propagate all operations (merge, remove) to the relating entities
            orphanRemoval = true // delete the SubscriptionUser when the Subscription is deleted
    )
    @EqualsAndHashCode.Exclude
    private Set<SubscriptionUser> subscriptionUsers = new LinkedHashSet<>();

}