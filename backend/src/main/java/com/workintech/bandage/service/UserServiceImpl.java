
package com.workintech.bandage.service;

import com.workintech.bandage.entity.Role;
import com.workintech.bandage.entity.Store;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.repository.RoleRepository;
import com.workintech.bandage.repository.StoreRepository;
import com.workintech.bandage.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StoreRepository storeRepository;

    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           StoreRepository storeRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.storeRepository = storeRepository;
    }

    @Override
    @Transactional
    public User register(User user, long roleId, Store store) {
        if (user == null || user.getId() != null) {
            return null;
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return null;
        }

        Role role = roleRepository.findById(roleId).orElse(null);

        if (role == null) {
            return null;
        }

        String roleCode = role.getCode();

        if (!"customer".equals(roleCode) && !"store".equals(roleCode)) {
            return null;
        }

        if ("store".equals(roleCode) && store == null) {
            return null;
        }

        if ("customer".equals(roleCode) && store != null) {
            return null;
        }

        if (store != null && store.getId() != null) {
            return null;
        }

        user.setRole(role);
        user.setEmailVerified(false);

        User savedUser = userRepository.save(user);

        if ("store".equals(roleCode)) {
            store.setUser(savedUser);
            storeRepository.save(store);
        }

        return savedUser;
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User updateUser(long id, User updatedUser) {
        User existingUser = getUserById(id);

        if (existingUser == null || updatedUser == null) {
            return null;
        }

        if (updatedUser.getEmail() != null
                && !updatedUser.getEmail().equals(existingUser.getEmail())) {

            if (userRepository.findByEmail(updatedUser.getEmail()).isPresent()) {
                return null;
            }

            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setEmailVerified(false);
        }

        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }

        return userRepository.save(existingUser);
    }

    @Override
    @Transactional
    public void deleteUser(long id) {
        User user = getUserById(id);

        if (user != null) {
            userRepository.delete(user);
        }
    }
}
