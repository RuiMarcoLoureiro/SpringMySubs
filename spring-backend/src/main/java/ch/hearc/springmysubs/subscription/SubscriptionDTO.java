package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.category.CategoryDTO;
import ch.hearc.springmysubs.period.PeriodDTO;
import lombok.Data;

import java.io.Serializable;

@Data
public class SubscriptionDTO implements Serializable {
    private Long id;
    private String name;
    private Double cost;
    private PeriodDTO period;
    private CategoryDTO category;
}
