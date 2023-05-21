package ch.hearc.springmysubs.user;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserDTO implements Serializable{
    private Long id;
    private String username;
}
