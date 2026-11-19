package com.workintech.bandage.service;

import com.workintech.bandage.dto.LoginRequestDto;
import com.workintech.bandage.entity.User;

public interface AuthenticationService {
    User login (LoginRequestDto request);
}
