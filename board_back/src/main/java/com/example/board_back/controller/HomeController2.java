package com.example.board_back.controller;

import com.example.board_back.model.Account;
import com.example.board_back.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * packageName : com.example.board_back.controller
 * fileName : HomeController
 * author : GGG
 * date : 2023-10-11
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-11         GGG          최초 생성
 */
@Slf4j
@Controller
public class HomeController2 {

    @Autowired
    AccountService accountService;


    @GetMapping("/")
    public String home(Model model) {
        return "home.jsp";
    }

    @GetMapping("/login")
    public String log() {
        return "login.jsp";
    }



}
