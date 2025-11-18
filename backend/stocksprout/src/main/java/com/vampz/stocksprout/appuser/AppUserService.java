package com.vampz.stocksprout.appuser;

import com.vampz.stocksprout.domain.portfolioMVC.PortfolioService;
import com.vampz.stocksprout.login.LoginRequest;
import com.vampz.stocksprout.security.PasswordEncoder;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AppUserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder  bCryptPasswordEncoder;
    private final PortfolioService portfolioService;

    public AppUserService(UserRepository userRepository, PasswordEncoder passwordEncoder, PortfolioService portfolioService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = passwordEncoder.bCryptPasswordEncoder();
        this.portfolioService = portfolioService;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("User not found for the email: " + email));
    }

    public Map<String,String> signUpUser(AppUser appUser) {
        boolean isPresent = userRepository.findByEmail(appUser.getEmail()).isPresent();
        if (isPresent) {
            return Map.of(
                    "status","error",
                    "message", "User with email already exists!");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);

        userRepository.save(appUser);
        appUser.setPortfolio(portfolioService.newDefaultPortfolio(appUser));
        return Map.of(
                "status","success",
                "message", "User was successfully signed up!"
        );
    }

    public Map<String, Object> loginUser(LoginRequest request) {
        return userRepository.findByEmail(request.getEmail())
                .map(user -> {
                    boolean passwordMatches = bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword());
                    if (!passwordMatches) {
                        return Map.<String,Object>of(
                                "status", "error",
                                "message", "Invalid email or password"
                        );
                    }
                    return Map.<String,Object>of(
                            "status", "success",
                            "message", "Login successful",
                            "user", Map.of(
                                    "firstName", user.getFirstName(),
                                    "lastName", user.getLastName(),
                                    "email", user.getEmail()
                            )
                    );
                }).orElse(Map.<String,Object>of(
                        "status", "error",
                        "message", "Invalid email or password"
                ));
    }





}
