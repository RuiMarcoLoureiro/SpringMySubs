package ch.hearc.springmysubs.category;

import ch.hearc.springmysubs.subscription.Subscription;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Size(max = 255)
    @NotNull
    private String name;

    @OneToMany(mappedBy = "categories")
    private Set<Subscription> subscriptions = new LinkedHashSet<>();
}