package com.jhosep32dev.coloresapi.security.controller;

import com.jhosep32dev.coloresapi.model.User;
import com.jhosep32dev.coloresapi.security.model.JWTRequest;
import com.jhosep32dev.coloresapi.security.model.JWTResponse;
import com.jhosep32dev.coloresapi.security.service.UserAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class JWTAuthenticationController {

    @Autowired
    private UserAuthenticationService userAuthenticationService;

    @PostMapping("/login")
    public ResponseEntity<JWTResponse> login(@RequestBody JWTRequest authenticationRequest, HttpServletResponse response) throws Exception {
        JWTResponse jwtResponse = userAuthenticationService.authenticate(authenticationRequest);

        if (jwtResponse == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(jwtResponse);
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser() {
        return ResponseEntity.ok(userAuthenticationService.getCurrentUser());
    }

}
