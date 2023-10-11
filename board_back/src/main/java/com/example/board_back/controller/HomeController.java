package com.example.board_back.controller;

import com.example.board_back.model.Account;
import com.example.board_back.repository.AccountRepository;
import com.example.board_back.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
@RestController
@RequestMapping("/api")
public class HomeController {

    @Autowired
    AccountService accountService;

    @GetMapping("/")
    public ResponseEntity<Object> home() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> logedin() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/register")
    public ResponseEntity<Object> register(@RequestBody Account account) {
        try {
            accountService.registry(account);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
