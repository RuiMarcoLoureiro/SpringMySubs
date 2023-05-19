package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.security.CurrentUserService;
import ch.hearc.springmysubs.subscription.requests.SortFilterRequest;
import ch.hearc.springmysubs.subscriptionUser.ISubscriptionUserDAO;
import ch.hearc.springmysubs.subscriptionUser.SubscriptionUser;
import ch.hearc.springmysubs.user.IUserDAO;
import ch.hearc.springmysubs.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class SubscriptionService implements ISubscriptionService {
    private final ISubscriptionDAO subscriptionDAO;
    private final ISubscriptionUserDAO subscriptionUserDAO;
    private final IUserDAO userDAO;
    private final CurrentUserService currentUserService;
    private final ISubscriptionMapper subscriptionMapper;

    @Autowired
    public SubscriptionService(ISubscriptionDAO subscriptionDAO, IUserDAO userDAO, ISubscriptionUserDAO subscriptionUserDAO, CurrentUserService currentUserService, ISubscriptionMapper subscriptionMapper) {
        this.subscriptionDAO = subscriptionDAO;
        this.userDAO = userDAO;
        this.subscriptionUserDAO = subscriptionUserDAO;
        this.currentUserService = currentUserService;
        this.subscriptionMapper = subscriptionMapper;
    }

    @Override
    public void saveSubscription(SubscriptionDTO subscriptionDTO) {
            // The current logged-in user
            User user = currentUserService.getCurrentUser();

            // Save the subscription
            Subscription subscription = subscriptionMapper.toEntity(subscriptionDTO);
            subscriptionDAO.save(subscription);

            // Associate the subscription with the user
            SubscriptionUser subscriptionUser = new SubscriptionUser(user, subscription);
            subscriptionUserDAO.save(subscriptionUser);

            // Add both sides of the relationship
            user.getSubscriptionUsers().add(subscriptionUser);
            subscription.getSubscriptionUsers().add(subscriptionUser);

            // Update the user
            userDAO.update(user);

            // Update the subscription
            subscriptionDAO.update(subscription);
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

    @Override
    public List<SubscriptionDTO> sortFilterSubscriptions(SortFilterRequest sortFilterRequest) {
        try {
            User user = currentUserService.getCurrentUser();
            return subscriptionUserDAO
                    .findAllByUserId(user.getId()) // Get all subscriptions of the user
                    .stream()
                    .map(subscriptionUser -> subscriptionUser.getSubscription())
                    .filter(subscription -> subscription.getCategory().getId() == sortFilterRequest.getCategoryId()) // Filter by category
                    .sorted((s1, s2) -> { // Sort by column
                        if (sortFilterRequest.getSortASC()) {
                            return switch (sortFilterRequest.getSortColumn()) {
                                case "name" -> s1.getName().compareTo(s2.getName());
                                case "cost" -> s1.getCost().compareTo(s2.getCost());
                                default -> 0;
                            };
                        } else {
                            return switch (sortFilterRequest.getSortColumn()) {
                                case "name" -> s2.getName().compareTo(s1.getName());
                                case "cost" -> s2.getCost().compareTo(s1.getCost());
                                default -> 0;
                            };
                        }
                    })
                    .map(subscriptionMapper::toDto)
                    .collect(Collectors.toList());

        } catch (NoSuchElementException e) {
            return null;
        }
    }


}
