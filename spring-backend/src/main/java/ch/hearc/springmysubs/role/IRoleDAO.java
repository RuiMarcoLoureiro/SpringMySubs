package ch.hearc.springmysubs.role;

import ch.hearc.springmysubs.shared.DAO;

public interface IRoleDAO extends DAO<Role> {
    public Role findByName(RoleName name);
}
