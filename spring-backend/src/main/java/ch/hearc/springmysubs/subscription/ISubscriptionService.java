package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.subscription.requests.*;
import ch.hearc.springmysubs.subscription.responses.PriceResponse;
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
    public void price(PriceRequest priceRequest);
    public PriceResponse lastPrice();
}
