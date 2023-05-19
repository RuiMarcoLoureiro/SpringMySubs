package ch.hearc.springmysubs.subscription;

import ch.hearc.springmysubs.category.Category;
import ch.hearc.springmysubs.category.CategoryDTO;
import ch.hearc.springmysubs.category.ICategoryMapper;
import ch.hearc.springmysubs.period.IPeriodMapper;
import ch.hearc.springmysubs.period.Period;
import ch.hearc.springmysubs.period.PeriodDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

// See this tutorial : https://www.javaguides.net/2022/12/spring-boot-mapstruct-example-tutorial.html
@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING, // componentModel = "spring" is required to use @Autowired in the service
        unmappedTargetPolicy = ReportingPolicy.IGNORE // Ignore unmapped fields
)
public interface ISubscriptionMapper{
    ISubscriptionMapper INSTANCE = Mappers.getMapper(ISubscriptionMapper.class);

    // Automatically map the fields of the two objects with the same name

    Subscription toEntity(SubscriptionDTO subscriptionDTO);
    SubscriptionDTO toDto(Subscription subscription);

    Period toEntity(PeriodDTO periodDTO);
    PeriodDTO toDto(Period period);

    Category toEntity(CategoryDTO categoryDTO);
    CategoryDTO toDto(Category category);
}