package ch.hearc.springmysubs.subscriptionUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class SubscriptionUserDAO implements ISubscriptionUserDAO{
    private final ISubscriptionUserRepository subscriptionUserRepository;

    @Autowired
    public SubscriptionUserDAO(ISubscriptionUserRepository subscriptionUserRepository) {
        this.subscriptionUserRepository = subscriptionUserRepository;
    }

    @Override
    public void save(SubscriptionUser subscriptionUser) {
        subscriptionUserRepository.save(subscriptionUser);
    }

    @Override
    public Optional<SubscriptionUser> get(Long id) {
        return subscriptionUserRepository.findById(id);
    }

    @Override
    public List<SubscriptionUser> getAll() {
        return subscriptionUserRepository.findAll();
    }

    @Override
    public void update(SubscriptionUser subscriptionUser) {
        subscriptionUserRepository.save(subscriptionUser);
    }

    @Override
    public void delete(SubscriptionUser subscriptionUser) {
        subscriptionUserRepository.delete(subscriptionUser);
    }

    @Override
    public List<SubscriptionUser> findAllByUserId(Long userId) {
        return subscriptionUserRepository.findAllByUserId(userId);
    }
}
