package ch.hearc.springmysubs.period;

import ch.hearc.springmysubs.subscription.Subscription;
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
@Table(name = "periods")
public class Period {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 255)
    @NotNull
    private String name;

    @OneToMany(mappedBy = "periods")
    private Set<Subscription> subscriptions = new LinkedHashSet<>();

}