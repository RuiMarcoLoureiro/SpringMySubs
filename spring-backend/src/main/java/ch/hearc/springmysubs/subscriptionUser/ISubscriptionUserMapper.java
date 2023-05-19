package ch.hearc.springmysubs.subscriptionUser;

import ch.hearc.springmysubs.role.Role;
import ch.hearc.springmysubs.role.RoleDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

// See this tutorial : https://www.javaguides.net/2022/12/spring-boot-mapstruct-example-tutorial.html
@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING, // componentModel = "spring" is required to use @Autowired in the service
        unmappedTargetPolicy = ReportingPolicy.IGNORE // Ignore unmapped fields
)
public interface ISubscriptionUserMapper {
    ISubscriptionUserMapper INSTANCE = Mappers.getMapper(ISubscriptionUserMapper.class);

    // Automatically map the fields of the two objects with the same name

    SubscriptionUser toEntity(SubscriptionUserDTO subscriptionUserDTO);
    SubscriptionUserDTO toDto(SubscriptionUser subscriptionUser);
}