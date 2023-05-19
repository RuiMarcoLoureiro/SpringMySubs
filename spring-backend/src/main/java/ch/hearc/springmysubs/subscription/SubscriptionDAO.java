package ch.hearc.springmysubs.subscription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class SubscriptionDAO implements ISubscriptionDAO {
    private final ISubscriptionRepository subscriptionRepository;

    @Autowired
    public SubscriptionDAO(ISubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public void save(Subscription subscription) {
        subscriptionRepository.save(subscription);
    }

    @Override
    public Optional<Subscription> get(Long id) {
        return subscriptionRepository.findById(id);
    }

    @Override
    public List<Subscription> getAll() {
        return subscriptionRepository.findAll();
    }

    @Override
    public void update(Subscription subscription) {
        subscriptionRepository.save(subscription);
    }

    @Override
    public void delete(Subscription subscription) {
        subscriptionRepository.delete(subscription);
    }
}
