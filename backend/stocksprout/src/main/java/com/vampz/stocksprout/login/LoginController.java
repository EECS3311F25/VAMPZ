package com.vampz.stocksprout.login;

import com.vampz.stocksprout.appuser.AppUser;
import com.vampz.stocksprout.appuser.UserRepository;
import com.vampz.stocksprout.domain.portfolioMVC.PortfolioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("api/login")
@AllArgsConstructor
public class LoginController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final PortfolioService portfolioService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        return userRepository.findByEmail(request.getEmail())
                .map(user -> {
                    boolean ok = bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword());
                    if (!ok) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                                "status", "error",
                                "message", "Invalid email or password"
                        ));
                    }
                    HttpSession session = httpRequest.getSession(true);
                    session.setAttribute("USER_ID", user.getId());
                    session.setMaxInactiveInterval(60 * 60);
                    portfolioService.refresh(user.getPortfolio());
                    return ResponseEntity.ok(Map.of(
                            "status", "success",
                            "message", "Login successful",
                            "user", Map.of(
                                    "firstName", user.getFirstName(),
                                    "lastName", user.getLastName(),
                                    "email", user.getEmail()
                            )
                    ));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "status", "error",
                        "message", "Invalid email or password"
                )));
    }

    

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"
            ));
        }
        Object userId = session.getAttribute("USER_ID");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Not authenticated"
            ));
        }
        return userRepository.findById((Long) userId)
                .map(user -> ResponseEntity.ok(Map.of(
                        "status", "success",
                        "user", Map.of(
                                "firstName", user.getFirstName(),
                                "lastName", user.getLastName(),
                                "email", user.getEmail()
                        )
                )))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                        "status", "error",
                        "message", "Not authenticated"
                )));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Logged out"
        ));
    }


}
