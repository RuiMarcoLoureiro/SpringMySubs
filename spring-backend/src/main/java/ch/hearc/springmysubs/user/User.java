package ch.hearc.springmysubs.user;

import ch.hearc.springmysubs.role.Role;
import ch.hearc.springmysubs.shared.BaseEntity;
import ch.hearc.springmysubs.subscriptionUser.SubscriptionUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true) // Take into account the parent attributes in equals and hashcode
public class User extends BaseEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Size(max = 255)
    @NotNull(message = "Username cannot be null")
    private String username;

    @Size(max = 255)
    @NotNull(message = "Password cannot be null")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), // users_id is the name of the column in the table users_roles
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id") // roles_id is the name of the column in the table users_roles
    )
    @EqualsAndHashCode.Exclude
    private Set<Role> roles = new LinkedHashSet<>();

    @OneToMany(
            mappedBy = "user", // user is the name of the attribute in the SubscriptionUser class
            fetch = FetchType.EAGER, // load all the data when loading the role
            cascade = CascadeType.ALL, // propagate all operations (persist, remove, refresh, merge, detach) to the relating entities
            orphanRemoval = true // delete the SubscriptionUser when the User is deleted
    )
    @EqualsAndHashCode.Exclude
    private Set<SubscriptionUser> subscriptionUsers = new LinkedHashSet<>();

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toSet());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}