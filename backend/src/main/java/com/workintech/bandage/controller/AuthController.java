package com.workintech.bandage.controller;

import com.workintech.bandage.dto.LoginRequestDto;
import com.workintech.bandage.dto.LoginResponseDto;
import com.workintech.bandage.dto.RegisterRequestDto;
import com.workintech.bandage.dto.ResendVerificationEmailRequestDto;
import com.workintech.bandage.entity.Store;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.service.AuthenticationService;
import com.workintech.bandage.service.EmailVerificationTokenService;
import com.workintech.bandage.service.TokenService;
import com.workintech.bandage.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    private UserService userService;
    private AuthenticationService authenticationService;
    private TokenService tokenService;
    private EmailVerificationTokenService emailVerificationTokenService;

    @Autowired
    public AuthController(UserService userService,AuthenticationService authenticationService,TokenService tokenService,EmailVerificationTokenService emailVerificationTokenService){
        this.userService = userService;
        this.authenticationService = authenticationService;
        this.tokenService = tokenService;
        this.emailVerificationTokenService = emailVerificationTokenService;
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam String token){
        emailVerificationTokenService.verifyEmail(token);

        return ResponseEntity.ok("Email verified successfully");
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
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto request){
        User user = authenticationService.login(request);

        String token = tokenService.generateToken(user);

        return ResponseEntity.ok(new LoginResponseDto(token,user.getId(),user.getName(),user.getEmail(), user.isEmailVerified()));
    }

    @GetMapping("/verify")
    public ResponseEntity<LoginResponseDto> verify(
            @AuthenticationPrincipal Jwt jwt) {

        Long userId = ((Number) jwt.getClaim("userId")).longValue();

        User user = userService.getUserById(userId);

        if (!user.isEmailVerified()){
            throw new BandageException("Please verify your email address",HttpStatus.FORBIDDEN);
        }

        String token = tokenService.generateToken(user);

        return ResponseEntity.ok(new LoginResponseDto(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.isEmailVerified()
        ));
    }
    @PostMapping("/resend-verification-email")
    public ResponseEntity<Void> resendVerificationEmail(@Valid @RequestBody ResendVerificationEmailRequestDto request){
        userService.resendVerificationEmail(request.email());

        return ResponseEntity.accepted().build();
    }



}
