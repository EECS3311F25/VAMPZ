package com.vampz.stocksprout.registration;

import com.vampz.stocksprout.appuser.AppUser;
import com.vampz.stocksprout.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

import static com.vampz.stocksprout.appuser.AppUserRole.USER;

@Service
@AllArgsConstructor
public class RegistrationService {
    private final AppUserService appUserService;
    private final EmailValidator emailValidator;

    public Map<String,String> register(RegistrationRequest request) {
        boolean isvalidEmail = emailValidator.test(request.getEmail());
        if (!isvalidEmail) {
            return Map.of(
                    "status","error",
                    "message","Invalid email address"
            );
        }
       Map<String,String> result = appUserService.signUpUser(
               new AppUser(
                       request.getFirstName(),
                       request.getLastName(),
                       request.getEmail(),
                       request.getPassword(),
                       USER
               )
       );

        return result;
    }
}
