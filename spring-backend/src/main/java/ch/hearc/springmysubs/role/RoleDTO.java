package ch.hearc.springmysubs.role;

import lombok.Data;

import java.io.Serializable;

@Data
public class RoleDTO implements Serializable {
    private RoleName name;
}
