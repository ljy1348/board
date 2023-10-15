package com.example.board_back.controller;

import com.example.board_back.model.Account;
import com.example.board_back.repository.AccountRepository;
import com.example.board_back.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
@Slf4j
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
    public ResponseEntity<Object> logedin(@RequestBody Account account, HttpServletResponse response) {
        try {
        String st = accountService.login(account);
        response.addHeader("Authorization", "Bearer " + st);
        return new ResponseEntity<>(st,HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<Object> logedin(@RequestBody Account account) {
//        try {
//            String st = accountService.login(account);
//            HttpHeaders headers = new HttpHeaders();
//            headers.add("Authorization", "Bearer " + st);
//            return new ResponseEntity<>("성공",headers,HttpStatus.OK);
//        } catch(Exception e) {
//            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
//        }
//    }


    @PutMapping("/register")
    public ResponseEntity<Object> register(@RequestBody Account account) {
        System.out.println("레지스터 시작");
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

    @GetMapping("/user/token")
    public ResponseEntity<Object> to() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/admin/token")
    public ResponseEntity<Object> sub() {
        List<Account> list = accountService.findAll();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @PostMapping("/admin/change")
    public ResponseEntity<Object> change(@RequestBody Account account) {
        try {
        accountService.changeAthority(account);
        return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }


}
