package com.workintech.bandage.dto;

import com.workintech.bandage.entity.Store;
import com.workintech.bandage.entity.User;

public record RegisterRequestDto(User user, long roleId, Store store) {
}
