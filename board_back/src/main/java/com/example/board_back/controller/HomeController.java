package com.example.board_back.controller;

import com.example.board_back.model.Account;
import com.example.board_back.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "home.jsp";
    }
    @GetMapping("/login")
    public String logedin() {
        return "login.jsp";
    }
    @GetMapping("/hello")
    public String hello() {
        return "hello.jsp";
    }

    @Autowired
    private AccountRepository accountRepository;
    @GetMapping("/create")
    @ResponseBody
    public Account createAccount() {
        Account account = new Account();
        account.setEmail("a");
        account.setPassword("{noop}a");
        account.setAuthority("ROLE_USER");
        return accountRepository.save(account);
    }
}
