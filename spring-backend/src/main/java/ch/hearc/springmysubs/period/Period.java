package ch.hearc.springmysubs.period;

import ch.hearc.springmysubs.shared.BaseEntity;
import ch.hearc.springmysubs.subscription.Subscription;
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
@ToString
@EqualsAndHashCode(callSuper = true) // Take into account the parent attributes in equals and hashcode
public class Period extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 255)
    @NotNull
    private String name;

    @OneToMany(mappedBy = "period") // period is the name of the attribute in the Subscription class
    @EqualsAndHashCode.Exclude
    private Set<Subscription> subscriptions = new LinkedHashSet<>();

    public Period(String name) {
        this.name = name;
    }
}