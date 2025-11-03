package com.vampz.stocksprout.login;

import com.vampz.stocksprout.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/login")
@AllArgsConstructor
public class LoginController {

    private final AppUserService appUserService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Map<String, Object> response = appUserService.loginUser(request);

        if ("error".equals(response.get("status"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        return ResponseEntity.ok(response);
    }
}
