package ch.hearc.springmysubs.subscriptionUser;

import java.util.List;

public interface ISubscriptionUserService {
    public void saveSubscriptionUser(SubscriptionUserDTO subscriptionUser);
    public SubscriptionUserDTO getSubscriptionUserById(Long id);
    public List<SubscriptionUserDTO> getAllSubscriptionUsers();
    public void updateSubscriptionUser(SubscriptionUserDTO subscriptionUser);
    public void deleteSubscriptionUser(SubscriptionUserDTO subscriptionUser);
}
