package com.workintech.bandage.service;

import com.workintech.bandage.entity.Role;
import com.workintech.bandage.entity.User;
import com.workintech.bandage.repository.RoleRepository;
import com.workintech.bandage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,RoleRepository roleRepository){
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }


    @Override
    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new IllegalArgumentException("Bu e-posta zaten kayıtlı");
        }
        Role role = roleRepository.findByCode("USER").orElseThrow(() ->
                new IllegalStateException("USER rolü bulunamadı."));

        user.setRole(role);
        return userRepository.save(user);
    }

}
