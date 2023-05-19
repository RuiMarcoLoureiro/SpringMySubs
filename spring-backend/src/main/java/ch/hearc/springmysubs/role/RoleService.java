package ch.hearc.springmysubs.role;

import ch.hearc.springmysubs.shared.DAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService implements IRoleService {
    private final IRoleDAO roleDAO;
    private final IRoleMapper roleMapper;

    @Autowired
    public RoleService(RoleDAO roleDAO, IRoleMapper roleMapper) {
        this.roleDAO = roleDAO;
        this.roleMapper = roleMapper;
    }

    @Override
    public void saveRole(RoleDTO role) {
        roleDAO.save(roleMapper.toEntity(role));
    }

    @Override
    public RoleDTO getRoleById(Long id) {
        return roleDAO.get(id).map(roleMapper::toDto).orElse(null);
    }

    @Override
    public List<RoleDTO> getAllRoles() {
        return roleDAO.getAll().stream().map(roleMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void updateRole(RoleDTO role) {
        roleDAO.update(roleMapper.toEntity(role));
    }

    @Override
    public void deleteRole(RoleDTO role) {
        roleDAO.delete(roleMapper.toEntity(role));
    }
}
