package com.medivision.controller;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/encode")
    public String encodePassword() {

        BCryptPasswordEncoder encoder =
                new BCryptPasswordEncoder();

        return encoder.encode("newpassword");
    }
}