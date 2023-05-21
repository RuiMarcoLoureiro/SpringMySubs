package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.subscription.requests.SortFilterRequest;
import ch.hearc.springmysubs.subscription.requests.UsersNotSubbedRequest;
import ch.hearc.springmysubs.subscription.requests.UsersSubbedRequest;
import ch.hearc.springmysubs.subscription.responses.UsersNotSubbedResponse;
import ch.hearc.springmysubs.subscription.responses.UsersSubbedResponse;

import java.util.List;

public interface ISubscriptionService {
    public void saveSubscription(SubscriptionDTO subscription);
    public SubscriptionDTO getSubscriptionById(Long id);
    public List<SubscriptionDTO> getAllSubscriptions();
    public void updateSubscription(SubscriptionDTO subscription);
    public void deleteSubscription(SubscriptionDTO subscription);
    public List<SubscriptionDTO> sortFilterSubscriptions(SortFilterRequest sortFilterRequest);
    public List<UsersSubbedResponse> usersSubbed(UsersSubbedRequest usersSubbedRequest);
    public List<UsersNotSubbedResponse> usersNotSubbed(UsersNotSubbedRequest usersNotSubbedRequest);
}
