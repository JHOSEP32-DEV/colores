package com.jhosep32dev.coloresapi.security.service.impl;

import com.jhosep32dev.coloresapi.model.User;
import com.jhosep32dev.coloresapi.repository.UserRepository;
import com.jhosep32dev.coloresapi.security.config.JWTTokenUtil;
import com.jhosep32dev.coloresapi.security.model.JWTRequest;
import com.jhosep32dev.coloresapi.security.model.JWTResponse;
import com.jhosep32dev.coloresapi.security.service.UserAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class UserAuthenticationServiceImpl implements UserAuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTTokenUtil jwtTokenUtil;

    public JWTResponse authenticate(JWTRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(username);

            User user = userRepository.findFirstByUsername(userDetails.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails);

            return new JWTResponse(token, user);
        } catch (BadCredentialsException e) {
            return null;
        }
    }

    @Override
    public User getCurrentUser() {
        String username;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        return userRepository.findFirstByUsername(username);
    }

}
