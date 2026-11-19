
package com.workintech.bandage.service;

import com.workintech.bandage.dto.LoginRequestDto;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService{

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;

    @Autowired
    public AuthenticationServiceImpl(AuthenticationManager authenticationManager,UserRepository userRepository){
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }
    @Override
    public User login(LoginRequestDto request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(),
                            request.password()
                    )
            );
        } catch (AuthenticationException exception) {
            throw new BandageException(
                    "Invalid email or password",
                    HttpStatus.UNAUTHORIZED
            );
        }

        return userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BandageException(
                        "Invalid email or password",
                        HttpStatus.UNAUTHORIZED
                ));
    }
}