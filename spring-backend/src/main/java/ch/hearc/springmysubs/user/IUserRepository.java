package ch.hearc.springmysubs.user;


import ch.hearc.springmysubs.role.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends ListCrudRepository<User, Long> {
    public Optional<User> findByUsername(String username);

    @Query("SELECT r FROM User u JOIN u.roles r WHERE u = :user")
    public List<Role> getRoles(User user);
}