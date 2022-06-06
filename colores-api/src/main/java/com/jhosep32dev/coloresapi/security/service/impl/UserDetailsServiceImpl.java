package com.jhosep32dev.coloresapi.security.service.impl;

import com.jhosep32dev.coloresapi.model.User;
import com.jhosep32dev.coloresapi.repository.UserRepository;
import com.jhosep32dev.coloresapi.security.model.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findFirstByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found.");
        }

        return new MyUserDetails(user);
    }
}
