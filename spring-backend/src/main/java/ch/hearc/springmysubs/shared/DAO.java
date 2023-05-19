package ch.hearc.springmysubs.shared;

import java.util.List;
import java.util.Optional;

/*
The DAO class is responsible for two concepts:
encapsulating the details of the persistence layer
and providing a CRUD interface for a single entity.

https://www.baeldung.com/jsf-spring-boot-controller-service-dao
 */
public interface DAO<T> {
    void save(T t);
    Optional<T> get(Long id);
    List<T> getAll();
    void update(T t);
    void delete(T t);
}
