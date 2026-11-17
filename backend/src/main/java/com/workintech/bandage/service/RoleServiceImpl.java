package com.workintech.bandage.service;

import com.workintech.bandage.entity.Role;
import com.workintech.bandage.exception.BandageException;
import com.workintech.bandage.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new BandageException(
                        "Role not found: " + id,
                        HttpStatus.NOT_FOUND
                ));
    }

    @Override
    public Role getRoleByCode(String code) {
        return roleRepository.findByCode(code)
                .orElseThrow(() -> new BandageException(
                        "Role not found: " + code,
                        HttpStatus.NOT_FOUND
                ));
    }
}
