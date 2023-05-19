package ch.hearc.springmysubs.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @PutMapping("/")
    public void saveUser(@RequestBody @NotNull @Valid UserDTO userDTO) {
        userService.saveUser(userDTO);
    }

    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/")
    public void updateUser(@RequestBody @NotNull @Valid UserDTO userDTO) {
        userService.updateUser(userDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable UserDTO userDTO) {
        // Will automatically extract the id from the userDTO
        userService.deleteUser(userDTO);
    }
}
