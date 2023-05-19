package ch.hearc.springmysubs.security;

import ch.hearc.springmysubs.user.IUserDAO;
import ch.hearc.springmysubs.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CurrentUserService {
    private final IUserDAO userDAO;

    @Autowired
    public CurrentUserService(IUserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User getCurrentUser() throws NoSuchElementException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return userDAO.findByUsername(authentication.getName()).orElseThrow(() -> new NoSuchElementException("User not found"));
    }
}