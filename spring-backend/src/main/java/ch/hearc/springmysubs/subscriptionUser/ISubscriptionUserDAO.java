package ch.hearc.springmysubs.subscriptionUser;

import ch.hearc.springmysubs.shared.DAO;
import ch.hearc.springmysubs.user.User;

import java.util.List;

public interface ISubscriptionUserDAO extends DAO<SubscriptionUser> {
    public List<SubscriptionUser> findAllByUserId(Long userId);
    public List<User> findAllBySubscriptionId(Long subscriptionId);
    public List<SubscriptionUser> findAllAcceptedBySubscriptionId(Long subscriptionId);
    public List<SubscriptionUser> findAllNotAcceptedBySubscriptionId(Long subscriptionId);
}
