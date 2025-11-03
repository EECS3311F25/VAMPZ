package com.vampz.stocksprout.appuser;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@Entity
public class AppUser implements UserDetails {

    @Id
    @SequenceGenerator(
            name="user_seq",
            sequenceName="user_seq",
            allocationSize=1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_seq"
    )
    private Long id;
    private String name;
    private String username;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private AppUserRole role;
    private boolean enabled;
    private boolean locked;

    public AppUser(String name,
                   String username,
                   String email,
                   String password,
                   AppUserRole role,
                   boolean enabled,
                   boolean locked) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.enabled = enabled;
        this.locked = locked;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
