package ch.hearc.springmysubs.category;

import ch.hearc.springmysubs.shared.BaseEntity;
import ch.hearc.springmysubs.subscription.Subscription;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
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
public class Category extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Size(max = 255)
    @NotNull
    private String name;

    @OneToMany(mappedBy = "category") // category is the name of the attribute in the Subscription class
    @EqualsAndHashCode.Exclude
    private Set<Subscription> subscriptions = new LinkedHashSet<>();

    public Category(String name) {
        this.name = name;
    }
}