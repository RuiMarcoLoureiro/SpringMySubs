package ch.hearc.springmysubs.category;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepository extends ListCrudRepository<Category, Long> {
}