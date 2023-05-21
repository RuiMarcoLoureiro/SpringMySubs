package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.jms.GetMyPricesExchange;
import ch.hearc.springmysubs.security.CurrentUserService;
import ch.hearc.springmysubs.subscription.requests.*;
import ch.hearc.springmysubs.subscription.responses.PriceResponse;
import ch.hearc.springmysubs.subscription.responses.UsersNotSubbedResponse;
import ch.hearc.springmysubs.subscription.responses.UsersSubbedResponse;
import ch.hearc.springmysubs.subscriptionUser.ISubscriptionUserDAO;
import ch.hearc.springmysubs.subscriptionUser.ISubscriptionUserMapper;
import ch.hearc.springmysubs.subscriptionUser.SubscriptionUser;
import ch.hearc.springmysubs.user.IUserDAO;
import ch.hearc.springmysubs.user.IUserMapper;
import ch.hearc.springmysubs.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
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
    private JmsTemplate jmsTemplate;
    private final GetMyPricesExchange getMyPricesExchange;
    private final ISubscriptionMapper subscriptionMapper;
    private final ISubscriptionUserMapper subscriptionUserMapper;
    private final IUserMapper userMapper;

    @Autowired
    public SubscriptionService(
            ISubscriptionDAO subscriptionDAO,
            IUserDAO userDAO,
            ISubscriptionUserDAO subscriptionUserDAO,
            CurrentUserService currentUserService,
            JmsTemplate jmsTemplate,
            GetMyPricesExchange getMyPricesExchange,
            ISubscriptionMapper subscriptionMapper,
            ISubscriptionUserMapper subscriptionUserMapper,
            IUserMapper userMapper
    ) {
        this.subscriptionDAO = subscriptionDAO;
        this.userDAO = userDAO;
        this.subscriptionUserDAO = subscriptionUserDAO;
        this.currentUserService = currentUserService;
        this.jmsTemplate = jmsTemplate;
        this.getMyPricesExchange = getMyPricesExchange;
        this.subscriptionMapper = subscriptionMapper;
        this.subscriptionUserMapper = subscriptionUserMapper;
        this.userMapper = userMapper;
    }

    @Override
    @Transactional
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
                    .filter(subscription -> sortFilterRequest.getCategoryId() == null || subscription.getCategory().getId() == sortFilterRequest.getCategoryId()) // Filter by category
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

    @Override
    public List<UsersSubbedResponse> usersSubbed(UsersSubbedRequest usersSubbedRequest) {
        try {
            return subscriptionUserDAO
                    .findAllAcceptedBySubscriptionId(usersSubbedRequest.getSubscriptionId())
                    .stream()
                    .map(
                            subscriptionUser -> new UsersSubbedResponse(
                                    subscriptionMapper.toDto(subscriptionUser.getSubscription()),
                                    subscriptionUserMapper.toDto(subscriptionUser),
                                    userMapper.toDto(subscriptionUser.getUser())
                            )
                    )
                    .distinct()
                    .collect(Collectors.toList());
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    @Override
    public List<UsersNotSubbedResponse> usersNotSubbed(UsersNotSubbedRequest usersNotSubbedRequest) {
        try {
            return subscriptionUserDAO
                    .findAllNotAcceptedBySubscriptionId(usersNotSubbedRequest.getSubscriptionId())
                    .stream()
                    .map(
                            subscriptionUser -> new UsersNotSubbedResponse(
                                    subscriptionMapper.toDto(subscriptionUser.getSubscription()),
                                    subscriptionUserMapper.toDto(subscriptionUser),
                                    userMapper.toDto(subscriptionUser.getUser())
                            )
                    )
                    .distinct()
                    .collect(Collectors.toList());
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    @Override
    public void price(PriceRequest priceRequest) {
        jmsTemplate.convertAndSend("queue-subscription", priceRequest);
    }

    @Override
    public PriceResponse lastPrice()
    {
        return getMyPricesExchange.getLastPriceResponse();
    }


}
