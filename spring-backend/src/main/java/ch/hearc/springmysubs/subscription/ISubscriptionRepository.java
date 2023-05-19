package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.user.User;
import org.springframework.data.repository.ListCrudRepository;

public interface ISubscriptionRepository extends ListCrudRepository<Subscription, Long> {
}
