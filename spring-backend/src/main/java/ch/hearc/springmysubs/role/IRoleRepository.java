package ch.hearc.springmysubs.role;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends ListCrudRepository<Role, Long> {
    @Query("SELECT r FROM Role r WHERE r.name = :name")
    public Role findByName(RoleName name);
}