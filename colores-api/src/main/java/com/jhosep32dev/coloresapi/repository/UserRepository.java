package com.jhosep32dev.coloresapi.repository;

import com.jhosep32dev.coloresapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByUsername(String username);

}
