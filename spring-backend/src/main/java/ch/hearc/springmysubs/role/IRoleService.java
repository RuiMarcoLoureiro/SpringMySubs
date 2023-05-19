package ch.hearc.springmysubs.role;

import java.util.List;

public interface IRoleService {
    public void saveRole(RoleDTO role);

    public RoleDTO getRoleById(Long id);

    public List<RoleDTO> getAllRoles();

    public void updateRole(RoleDTO role);

    public void deleteRole(RoleDTO role);
}
