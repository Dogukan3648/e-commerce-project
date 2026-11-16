package com.workintech.bandage.controller;

import com.workintech.bandage.dto.UserResponseDto;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponseDto> getAllUsers() {
        return userService.getAllUsers()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public UserResponseDto getUserById(@PathVariable long id) {
        User user = userService.getUserById(id);

        return user == null ? null : toDto(user);
    }


    @PutMapping("/{id}")
    public UserResponseDto updateUser(@PathVariable long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);

        return updatedUser == null ? null : toDto(updatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
    }

    private UserResponseDto toDto(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.isEmailVerified()
        );
    }

}
