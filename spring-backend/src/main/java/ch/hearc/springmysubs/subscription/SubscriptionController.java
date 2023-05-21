package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.subscription.requests.PriceRequest;
import ch.hearc.springmysubs.subscription.requests.SortFilterRequest;
import ch.hearc.springmysubs.subscription.requests.UsersNotSubbedRequest;
import ch.hearc.springmysubs.subscription.requests.UsersSubbedRequest;
import ch.hearc.springmysubs.subscription.responses.PriceResponse;
import ch.hearc.springmysubs.subscription.responses.UsersNotSubbedResponse;
import ch.hearc.springmysubs.subscription.responses.UsersSubbedResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subscription")
public class SubscriptionController {
    private final ISubscriptionService subscriptionService;

    @Autowired
    public SubscriptionController(ISubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PutMapping("/")
    public void saveSubscription(@RequestBody @NotNull @Valid SubscriptionDTO subscriptionDTO) {
        subscriptionService.saveSubscription(subscriptionDTO);
    }

    @GetMapping("/{id}")
    public SubscriptionDTO getSubscription(@PathVariable Long id) {
        return subscriptionService.getSubscriptionById(id);
    }

    @GetMapping("/")
    public List<SubscriptionDTO> getAllSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }

    @PostMapping("/")
    public void updateSubscription(@RequestBody @NotNull @Valid SubscriptionDTO subscriptionDTO) {
        subscriptionService.updateSubscription(subscriptionDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteSubscription(@PathVariable SubscriptionDTO subscriptionDTO) {
        // Will automatically extract the id from the subscriptionDTO
        subscriptionService.deleteSubscription(subscriptionDTO);
    }


    /**
     * Get all subscriptions for the current user sorted by a given column (name or cost) filtered by a given category
     *
     * @param sortFilterRequest
     */
    @PostMapping("/sortFilterSubscriptions")
    public List<SubscriptionDTO> sortFilterSubscriptions(
            @RequestBody SortFilterRequest sortFilterRequest
    ) {
        return subscriptionService.sortFilterSubscriptions(sortFilterRequest);
    }

    /**
     * Get all users subscribed to a given subscription
     *
     * @param usersSubbedRequest
     */
    @PostMapping("/usersSubbed")
    public List<UsersSubbedResponse> usersSubbed(
            @RequestBody UsersSubbedRequest usersSubbedRequest
    ) {
        return subscriptionService.usersSubbed(usersSubbedRequest);
    }

    @PostMapping("/usersNotSubbed")
    public List<UsersNotSubbedResponse> usersNotSubbed(
            @RequestBody UsersNotSubbedRequest usersNotSubbedRequest
    ) {
        return subscriptionService.usersNotSubbed(usersNotSubbedRequest);
    }

    @PostMapping("/price")
    public void price(
            @RequestBody PriceRequest priceRequest
    ) {
        subscriptionService.price(priceRequest);
    }

    @GetMapping("/lastPrice")
    public PriceResponse lastPrice() {
        return subscriptionService.lastPrice();
    }
}
