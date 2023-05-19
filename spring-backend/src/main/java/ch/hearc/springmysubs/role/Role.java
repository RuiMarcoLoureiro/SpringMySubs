package ch.hearc.springmysubs.role;

import ch.hearc.springmysubs.shared.BaseEntity;
import ch.hearc.springmysubs.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
public class Role extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Role name cannot be null")
    @Enumerated(EnumType.STRING)
    @Column(unique = true)
    private RoleName name;

    @ManyToMany(
            mappedBy = "roles" // roles is the name of the attribute in the User class
    )
    @EqualsAndHashCode.Exclude
    private Set<User> users = new LinkedHashSet<>();

    public Role(RoleName name) {
        this.name = name;
    }

    public Role(String name) {
        this.name = RoleName.valueOf(name);
    }

    public String getRoleName() {
        return name.toString();
    }

}
