package ch.hearc.springmysubs.subscriptionUser;


import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISubscriptionUserRepository extends ListCrudRepository<SubscriptionUser, Long> {
}
