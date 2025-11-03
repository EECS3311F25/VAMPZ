package com.vampz.stocksprout.appuser;

import com.vampz.stocksprout.security.PasswordEncoder;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder  bCryptPasswordEncoder;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("User not found for the email: " + email));
    }

    public String signUpUser(AppUser appUser) {
        boolean isPresent = userRepository.findByEmail(appUser.getEmail()).isPresent();
        if (isPresent) {
            throw new IllegalStateException("User already exists with email: " + appUser.getEmail());
        }

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());

        appUser.setPassword(encodedPassword);
        userRepository.save(appUser);
        return "User was registered successfully with email: " + appUser.getEmail();
    }
}
