package com.workintech.bandage.service;

import com.workintech.bandage.entity.Role;
import com.workintech.bandage.entity.Store;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.RoleRepository;
import com.workintech.bandage.repository.StoreRepository;
import com.workintech.bandage.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StoreRepository storeRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, StoreRepository storeRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.storeRepository = storeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public User register(User user, long roleId, Store store) {
        if (user == null || user.getId() != null) {
            throw new BandageException("Invalid user data", HttpStatus.BAD_REQUEST);
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new BandageException("Email already exists", HttpStatus.CONFLICT);
        }

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new BandageException(
                        "Role not found: " + roleId,
                        HttpStatus.NOT_FOUND
                ));

        String roleCode = role.getCode();

        if (!"customer".equals(roleCode) && !"store".equals(roleCode)) {
            throw new BandageException("Invalid role", HttpStatus.BAD_REQUEST);
        }

        if ("store".equals(roleCode) && store == null) {
            throw new BandageException("Store information is required", HttpStatus.BAD_REQUEST);
        }

        if ("customer".equals(roleCode) && store != null) {
            throw new BandageException("Customer cannot have store information", HttpStatus.BAD_REQUEST);
        }

        if (store != null && store.getId() != null) {
            throw new BandageException("Invalid store data", HttpStatus.BAD_REQUEST);
        }

        user.setRole(role);
        user.setEmailVerified(false);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        if ("store".equals(roleCode)) {
            store.setUser(savedUser);
            storeRepository.save(store);
        }

        return savedUser;
    }

    @Override
    public User getUserById(long id) {
        return userRepository.findById(id).orElseThrow(() -> new BandageException("User not found " + id, HttpStatus.NOT_FOUND));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User updateUser(long id, User user) {
        User existingUser = getUserById(id);

        if (user == null) {
            throw new BandageException("User cannot be null", HttpStatus.BAD_REQUEST);
        }

        if (user.getEmail() != null && !user.getEmail().equals(existingUser.getEmail())) {

            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                throw new BandageException("Email already exists", HttpStatus.CONFLICT);
            }

            existingUser.setEmail(user.getEmail());
            existingUser.setEmailVerified(false);
        }

        if (user.getName() != null) {
            existingUser.setName(user.getName());
        }

        return userRepository.save(existingUser);
    }

    @Override
    @Transactional
    public void deleteUser(long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
