package ch.hearc.springmysubs.subscriptionUser;


import ch.hearc.springmysubs.user.User;
import ch.hearc.springmysubs.user.UserDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISubscriptionUserRepository extends ListCrudRepository<SubscriptionUser, Long> {
    public List<SubscriptionUser> findAllByUserId(Long userId);
    public List<User> findAllBySubscriptionId(Long subscriptionId);

    @Query("SELECT su FROM SubscriptionUser su WHERE su.subscription.id = ?1 AND su.accepted = true")
    public List<SubscriptionUser> findAllAcceptedBySubscriptionId(Long subscriptionId);

    @Query("SELECT su FROM SubscriptionUser su WHERE su.subscription.id = ?1 AND su.accepted = false")
    public List<SubscriptionUser> findAllNotAcceptedBySubscriptionId(Long subscriptionId);
}
