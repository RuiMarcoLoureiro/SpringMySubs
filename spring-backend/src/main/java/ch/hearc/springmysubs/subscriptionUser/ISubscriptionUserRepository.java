package ch.hearc.springmysubs.subscriptionUser;


import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISubscriptionUserRepository extends ListCrudRepository<SubscriptionUser, Long> {
    public List<SubscriptionUser> findAllByUserId(Long userId);
}
