package com.vampz.stocksprout.registration;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    public String register(RegistrationRequest request) {
        // For now, we just simulate registration
        // Later you’ll connect this to AppUserService and save user to DB
        System.out.println("Registering user: " + request.getEmail());
        return "Registration successful for " + request.getEmail();
    }
}
