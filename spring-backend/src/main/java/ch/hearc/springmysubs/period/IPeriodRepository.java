package ch.hearc.springmysubs.period;

import ch.hearc.springmysubs.role.Role;
import org.springframework.data.repository.ListCrudRepository;

public interface IPeriodRepository extends ListCrudRepository<Period, Long> {
    public Period findByName(String name);
}
