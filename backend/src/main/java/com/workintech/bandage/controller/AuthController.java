package com.workintech.bandage.controller;

import com.workintech.bandage.dto.RegisterRequestDto;
import com.workintech.bandage.entity.Store;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.service.UserService;
import jakarta.validation.Valid;
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
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequestDto request){
        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(request.password());

        Store store = null;

        if (request.store() != null){
            store = new Store();
            store.setName(request.store().name());
            store.setPhone(request.store().phone());
            store.setTaxNo(request.store().taxNo());
            store.setBankAccount(request.store().bankAccount());
        }
        userService.register(user,request.roleId(),store);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
