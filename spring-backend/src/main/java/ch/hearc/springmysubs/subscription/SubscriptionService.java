package ch.hearc.springmysubs.subscription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriptionService implements ISubscriptionService{
    private final ISubscriptionDAO subscriptionDAO;
    private final ISubscriptionMapper subscriptionMapper;

    @Autowired
    public SubscriptionService(ISubscriptionDAO subscriptionDAO, ISubscriptionMapper subscriptionMapper) {
        this.subscriptionDAO = subscriptionDAO;
        this.subscriptionMapper = subscriptionMapper;
    }

    @Override
    public void saveSubscription(SubscriptionDTO subscription) {
        subscriptionDAO.save(subscriptionMapper.toEntity(subscription));
    }

    @Override
    public SubscriptionDTO getSubscriptionById(Long id) {
        return subscriptionDAO.get(id).map(subscriptionMapper::toDto).orElse(null);
    }

    @Override
    public List<SubscriptionDTO> getAllSubscriptions() {
        return subscriptionDAO.getAll().stream().map(subscriptionMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void updateSubscription(SubscriptionDTO subscription) {
        subscriptionDAO.update(subscriptionMapper.toEntity(subscription));
    }

    @Override
    public void deleteSubscription(SubscriptionDTO subscription) {
        subscriptionDAO.delete(subscriptionMapper.toEntity(subscription));
    }
}
