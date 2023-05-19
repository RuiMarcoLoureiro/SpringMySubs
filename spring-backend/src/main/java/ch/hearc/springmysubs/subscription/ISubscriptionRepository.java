package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface ISubscriptionRepository extends ListCrudRepository<Subscription, Long> {
}
