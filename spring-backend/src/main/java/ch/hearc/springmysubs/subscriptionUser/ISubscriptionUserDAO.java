package ch.hearc.springmysubs.subscriptionUser;

import ch.hearc.springmysubs.shared.DAO;

import java.util.List;

public interface ISubscriptionUserDAO extends DAO<SubscriptionUser> {
    public List<SubscriptionUser> findAllByUserId(Long userId);
}
