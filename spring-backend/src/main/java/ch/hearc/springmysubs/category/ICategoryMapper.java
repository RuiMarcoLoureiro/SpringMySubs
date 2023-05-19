package ch.hearc.springmysubs.category;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

// See this tutorial : https://www.javaguides.net/2022/12/spring-boot-mapstruct-example-tutorial.html
@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING, // componentModel = "spring" is required to use @Autowired in the service
        unmappedTargetPolicy = ReportingPolicy.IGNORE // Ignore unmapped fields
)
public interface ICategoryMapper {
    ICategoryMapper INSTANCE = Mappers.getMapper(ICategoryMapper.class);

    // Automatically map the fields of the two objects with the same name

    Category toEntity(CategoryDTO categoryDTO);
    CategoryDTO toDto(Category category);
}