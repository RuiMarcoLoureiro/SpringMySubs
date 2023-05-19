package ch.hearc.springmysubs.period;

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
public class Period {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 255)
    @NotNull
    private String name;

    @OneToMany(mappedBy = "periods") // mappedBy = "periods" -> periods is the name of the attribute in Subscription
    private Set<Subscription> subscriptions = new LinkedHashSet<>();

    public Period(String name) {
        this.name = name;
    }
}