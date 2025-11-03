package com.vampz.stocksprout.login;

import com.vampz.stocksprout.appuser.AppUser;
import com.vampz.stocksprout.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/login")
@AllArgsConstructor
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final AppUserService appUserService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Map<String, Object> result = appUserService.loginUser(request);

        if ("error".equals(result.get("status"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
        return ResponseEntity.ok(result);
    }


}
