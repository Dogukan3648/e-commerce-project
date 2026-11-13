package com.workintech.bandage.service;

import com.workintech.bandage.entity.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
    Role getRoleById(long id);
    Role getRoleByCode(String code);
}
