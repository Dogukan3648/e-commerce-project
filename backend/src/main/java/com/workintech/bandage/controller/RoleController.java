package com.workintech.bandage.controller;

import com.workintech.bandage.entity.Role;
import com.workintech.bandage.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    private RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService){
        this.roleService = roleService;
    }
    @GetMapping
    public List<Role> getAllRoles(){
        return roleService.getAllRoles();
    }
    @GetMapping("/{id}")
    public Role getRoleById(@PathVariable long id){
        return roleService.getRoleById(id);
    }
    @GetMapping("/code/{code}")
    public Role getRoleByCode(@PathVariable String code){
        return roleService.getRoleByCode(code);
    }
}
