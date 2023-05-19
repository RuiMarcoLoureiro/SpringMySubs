package ch.hearc.springmysubs.subscriptionUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriptionUserService implements ISubscriptionUserService{
    private final ISubscriptionUserDAO subscriptionUserDAO;
    private final ISubscriptionUserMapper subscriptionUserMapper;

    @Autowired
    public SubscriptionUserService(ISubscriptionUserDAO subscriptionUserDAO, ISubscriptionUserMapper subscriptionUserMapper) {
        this.subscriptionUserDAO = subscriptionUserDAO;
        this.subscriptionUserMapper = subscriptionUserMapper;
    }

    @Override
    public void saveSubscriptionUser(SubscriptionUserDTO subscriptionUser) {
        subscriptionUserDAO.save(subscriptionUserMapper.toEntity(subscriptionUser));
    }

    @Override
    public SubscriptionUserDTO getSubscriptionUserById(Long id) {
        return subscriptionUserDAO.get(id).map(subscriptionUserMapper::toDto).orElse(null);
    }

    @Override
    public List<SubscriptionUserDTO> getAllSubscriptionUsers() {
        return subscriptionUserDAO.getAll().stream().map(subscriptionUserMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void updateSubscriptionUser(SubscriptionUserDTO subscriptionUser) {
        subscriptionUserDAO.update(subscriptionUserMapper.toEntity(subscriptionUser));
    }

    @Override
    public void deleteSubscriptionUser(SubscriptionUserDTO subscriptionUser) {
        subscriptionUserDAO.delete(subscriptionUserMapper.toEntity(subscriptionUser));
    }
}
