package ch.hearc.springmysubs.role;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Role name cannot be null")
    @Enumerated(EnumType.STRING)
    @Column(unique = true)
    private RoleName name;

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
