package ch.hearc.springmysubs.user;


import ch.hearc.springmysubs.auth.requests.LoginRequest;
import ch.hearc.springmysubs.auth.requests.RegisterRequest;
import ch.hearc.springmysubs.role.Role;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService {
    public void saveUser(UserDTO user);
    public UserDTO getUserById(Long id);
    public List<UserDTO> getAllUsers();
    public void updateUser(UserDTO user);
    public void deleteUser(UserDTO user);
    public UserDTO findByUsername(String username);
    public List<Role> getRoles(UserDTO user);
    public ResponseEntity<?> register(RegisterRequest registerRequest);
    public ResponseEntity<?> authenticate(LoginRequest loginRequest);
}
