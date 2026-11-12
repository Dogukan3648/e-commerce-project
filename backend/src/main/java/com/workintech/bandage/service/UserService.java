package com.workintech.bandage.service;

import com.workintech.bandage.entity.Store;
import com.workintech.bandage.entity.User;

import java.util.List;

public interface UserService {
    User register(User user, long roleId, Store store);
    User getUserById(long id);
    List<User> getAllUsers();
    User updateUser(long id,User user);
    void deleteUser(long id);
}
