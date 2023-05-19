package ch.hearc.springmysubs.period;

import ch.hearc.springmysubs.category.Category;
import ch.hearc.springmysubs.category.CategoryDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

// See this tutorial : https://www.javaguides.net/2022/12/spring-boot-mapstruct-example-tutorial.html
@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING, // componentModel = "spring" is required to use @Autowired in the service
        unmappedTargetPolicy = ReportingPolicy.IGNORE // Ignore unmapped fields
)
public interface IPeriodMapper {
    IPeriodMapper INSTANCE = Mappers.getMapper(IPeriodMapper.class);

    // Automatically map the fields of the two objects with the same name

    Period toEntity(PeriodDTO periodDTO);
    PeriodDTO toDto(Period period);
}