package com.workintech.bandage.controller;

import com.workintech.bandage.dto.RegisterRequestDto;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private UserService userService;

    @Autowired
    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> register(@RequestBody RegisterRequestDto request){
        User savedUser = userService.register(request.user(),request.roleId(),request.store());

        if (savedUser == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
