package ch.hearc.springmysubs;

import ch.hearc.springmysubs.category.Category;
import ch.hearc.springmysubs.category.ICategoryDAO;
import ch.hearc.springmysubs.period.IPeriodDAO;
import ch.hearc.springmysubs.period.Period;
import ch.hearc.springmysubs.role.*;
import ch.hearc.springmysubs.user.IUserDAO;
import ch.hearc.springmysubs.user.IUserRepository;
import ch.hearc.springmysubs.user.IUserService;
import ch.hearc.springmysubs.user.User;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;

@SpringBootApplication
public class SpringMySubsApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringMySubsApplication.class, args);
    }

    // Insert data on startup
    @Bean
    CommandLineRunner run(IRoleDAO roleDAO, IUserDAO userDAO, IPeriodDAO periodDAO, ICategoryDAO categoryDAO, PasswordEncoder passwordEncoder) {
        return args ->
        {
            roleDAO.save(new Role(RoleName.USER));
            roleDAO.save(new Role(RoleName.ADMIN));
            roleDAO.save(new Role(RoleName.SUPERADMIN));
            userDAO.save(
                    new User(
                            "user1",
                            passwordEncoder.encode("1234")
                    )
            );
            userDAO.save(
                    new User(
                            "user2",
                            passwordEncoder.encode("1234")
                    )
            );

            Role roleAdmin = roleDAO.findByName(RoleName.ADMIN);
            User userAdmin = userDAO.findByUsername("user1").orElse(null);
            userAdmin.addRole(roleAdmin);
            userDAO.save(userAdmin);

            Role roleSuperAdmin = roleDAO.findByName(RoleName.SUPERADMIN);
            User userSuperAdmin = userDAO.findByUsername("user2").orElse(null);
            userSuperAdmin.addRole(roleSuperAdmin);
            userDAO.save(userSuperAdmin);


            periodDAO.save(new Period("Monthly"));
            periodDAO.save(new Period("Yearly"));
            periodDAO.save(new Period("Weekly"));
            periodDAO.save(new Period("Daily"));


            categoryDAO.save(new Category("Apprentissage"));
            categoryDAO.save(new Category("Assurances"));
            categoryDAO.save(new Category("Autres"));
            categoryDAO.save(new Category("Divertissement"));
            categoryDAO.save(new Category("Hébergement"));
            categoryDAO.save(new Category("Sport"));
        };
    }


}
