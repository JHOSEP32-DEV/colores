package com.jhosep32dev.coloresapi.security.service;

import com.jhosep32dev.coloresapi.model.User;
import com.jhosep32dev.coloresapi.security.model.JWTRequest;
import com.jhosep32dev.coloresapi.security.model.JWTResponse;

public interface UserAuthenticationService {
    JWTResponse authenticate(JWTRequest authenticationRequest);

    User getCurrentUser();

}
