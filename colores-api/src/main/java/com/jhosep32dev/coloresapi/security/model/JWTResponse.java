package com.jhosep32dev.coloresapi.security.model;

import com.jhosep32dev.coloresapi.model.User;

import java.io.Serial;
import java.io.Serializable;

public class JWTResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = -8091879091924046844L;

    private User user;

    private final String token;

    public JWTResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
