package ch.hearc.springmysubs.auth;

import lombok.Data;

import java.io.Serializable;

@Data
public class RegisterDTO implements Serializable {
    private String username;
    private String password;
}
