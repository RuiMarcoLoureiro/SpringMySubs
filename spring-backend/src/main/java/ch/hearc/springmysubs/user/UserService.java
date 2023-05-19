package ch.hearc.springmysubs.user;


import ch.hearc.springmysubs.auth.requests.LoginRequest;
import ch.hearc.springmysubs.auth.requests.RegisterRequest;
import ch.hearc.springmysubs.role.IRoleDAO;
import ch.hearc.springmysubs.role.Role;
import ch.hearc.springmysubs.role.RoleName;
import ch.hearc.springmysubs.security.BearerToken;
import ch.hearc.springmysubs.security.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {
    private final IUserDAO userDAO;
    private final IRoleDAO roleDAO;
    private final IUserMapper userMapper;
    private final JwtUtilities jwtUtilities;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(IUserDAO IUserDao, IUserMapper userMapper, IRoleDAO roleDAO, JwtUtilities jwtUtilities, AuthenticationManager authenticationManager) {
        this.userDAO = IUserDao;
        this.userMapper = userMapper;
        this.roleDAO = roleDAO;
        this.jwtUtilities = jwtUtilities;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Add a user
     *
     * @param user
     */
    @Override
    public void saveUser(UserDTO user) {
        userDAO.save(userMapper.toEntity(user));
    }

    /**
     * Get a user by its id
     *
     * @param id
     */
    @Override
    public UserDTO getUserById(Long id) {
        return userDAO.get(id).map(userMapper::toDto).orElse(null);
    }

    /**
     * Get all users
     */
    @Override
    public List<UserDTO> getAllUsers() {
        return userDAO.getAll().stream().map(userMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Update a user
     *
     * @param user
     */
    @Override
    public void updateUser(UserDTO user) {
        userDAO.update(userMapper.toEntity(user));
    }

    /**
     * Delete a user
     *
     * @param user
     */
    @Override
    public void deleteUser(UserDTO user) {
        userDAO.delete(userMapper.toEntity(user));
    }


    /**
     * Get all roles of a user
     *
     * @param user
     */
    @Override
    public List<Role> getRoles(UserDTO user) {
        return userDAO.getRoles(userMapper.toEntity(user));
    }


    /**
     * Get a user by its username
     *
     * @param username
     */
    @Override
    public UserDTO findByUsername(String username) {
        return userDAO.findByUsername(username).map(userMapper::toDto).orElse(null);
    }

    /**
     * Register a user
     *
     * @param registerRequest
     */
    @Override
    public ResponseEntity<?> register(RegisterRequest registerRequest) {
        if (userDAO.findByUsername(registerRequest.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        } else {
            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setPassword(registerRequest.getPassword());
            // by default, a new user is a USER
            Role role = roleDAO.findByName(RoleName.USER);
            user.setRoles(Set.of(role));

            userDAO.save(user);

            String token = jwtUtilities.generateToken(registerRequest.getUsername(), List.of(role.getRoleName()));
            return ResponseEntity.ok(new BearerToken(token, "Bearer "));
        }
    }

    /**
     * Authenticate a user
     *
     * @param loginRequest
     */
    @Override
    public ResponseEntity authenticate(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userDAO.findByUsername(loginRequest.getUsername()).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + loginRequest.getUsername()));
            String token = jwtUtilities.generateToken(
                    loginRequest.getUsername(),
                    userDAO.getRoles(user).stream().map(Role::getRoleName).collect(Collectors.toList())
            );

            return ResponseEntity.ok(new BearerToken(token, "Bearer "));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
