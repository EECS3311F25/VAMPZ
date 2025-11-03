package com.vampz.stocksprout.registration;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "api/registration")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public Map<String, String>
    register(@RequestBody RegistrationRequest request) {
        Map<String,String> result = registrationService.register(request);

        return result;
    }
}
