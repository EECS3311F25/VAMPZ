package com.vampz.stocksprout.registration;

import com.vampz.stocksprout.appuser.AppUser;
import com.vampz.stocksprout.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.vampz.stocksprout.appuser.AppUserRole.USER;

@Service
@AllArgsConstructor
public class RegistrationService {
    private final AppUserService appUserService;
    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) {
        boolean isvalidEmail = emailValidator.test(request.getEmail());
        if (!isvalidEmail) {
            throw new IllegalStateException("Invalid email address");
        }
       return appUserService.signUpUser(
               new AppUser(
                       request.getFirstName(),
                       request.getLastName(),
                       request.getEmail(),
                       request.getPassword(),
                       USER
               )
       );
    }
}
