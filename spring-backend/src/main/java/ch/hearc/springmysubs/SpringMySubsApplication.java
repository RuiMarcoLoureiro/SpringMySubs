package ch.hearc.springmysubs;

import ch.hearc.springmysubs.role.*;
import ch.hearc.springmysubs.user.IUserDAO;
import ch.hearc.springmysubs.user.IUserRepository;
import ch.hearc.springmysubs.user.IUserService;
import ch.hearc.springmysubs.user.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class SpringMySubsApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringMySubsApplication.class, args);
    }


//    @Bean
//    CommandLineRunner run(IRoleDAO roleDAO, IUserDAO userDAO, PasswordEncoder passwordEncoder) {
//        return args ->
//        {
//            roleDAO.save(new Role(RoleName.USER));
//            roleDAO.save(new Role(RoleName.ADMIN));
//            roleDAO.save(new Role(RoleName.SUPERADMIN));
//            userDAO.save(
//                    new User(
//                            "admin",
//                            passwordEncoder.encode("adminPassword")
//                    )
//            );
//            userDAO.save(
//                    new User(
//                            "superadminadmin",
//                            passwordEncoder.encode("superadminPassword")
//                    )
//            );
//
//            Role roleAdmin = roleDAO.findByName(RoleName.ADMIN);
//            User userAdmin = userDAO.findByUsername("admin").orElse(null);
//            userAdmin.getRoles().add(roleAdmin);
//            userDAO.save(userAdmin);
//
//            Role roleSuperAdmin = roleDAO.findByName(RoleName.SUPERADMIN);
//            User userSuperAdmin = userDAO.findByUsername("superadminadmin").orElse(null);
//            userSuperAdmin.getRoles().add(roleSuperAdmin);
//            userDAO.save(userSuperAdmin);
//
//        };
//    }


}
