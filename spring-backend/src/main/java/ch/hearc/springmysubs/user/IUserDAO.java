package ch.hearc.springmysubs.user;


import ch.hearc.springmysubs.role.Role;
import ch.hearc.springmysubs.shared.DAO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


public interface IUserDAO extends DAO<User> {
    public Optional<User> findByUsername(String username);
    public List<Role> getRoles(User user);
}

