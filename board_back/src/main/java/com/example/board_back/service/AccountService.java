package com.example.board_back.service;

import com.example.board_back.jwt.JwtUtil;
import com.example.board_back.model.Account;
import com.example.board_back.repository.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.board_back.service
 * fileName : UserService
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
@Service
public class AccountService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;


    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = new Account();
        try {
            account = accountRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("No user found with username: " + username));
        } catch (Exception e) {
            System.out.println(e);
        }
        return new User(
                account.getUsername(),
                account.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + account.getAuthority().name()))
        );
    }

    public List<Account> getAll() {
        List<Account> list = accountRepository.findAll();
        return list;
    }

    public void registry(Account account) {
        if (account.getAuthority() == null) {
            account.setAuthority(Account.Authority.USER);
        }
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        accountRepository.save(account);
    }

    public String login(Account account) {
        Account account2 = accountRepository.findByUsername(account.getUsername())
        .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 ID 입니다."));
        if (!passwordEncoder.matches(account.getPassword(), account2.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        return jwtUtil.createToken(account2);
    }

    public List<Account> findAll() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        GrantedAuthority authority = auth.getAuthorities().stream().findFirst().orElse(null);
        List<Account> list;
        if (authority != null) {
            String userRole = authority.getAuthority();
            if ("ROLE_SUPER_ADMIN".equals(userRole)) {
                List<Account.Authority> list2 = new ArrayList<>();
                list2.add(Account.Authority.ADMIN);
                list2.add(Account.Authority.USER);
                return accountRepository.findByAuthorityIn(list2);
            } else if ("ROLE_ADMIN".equals(userRole)) {
                // 사용자가 'ROLE_ADMIN' 권한을 가지고 있음
                return accountRepository.findByAuthority(Account.Authority.USER);
            }
        }
        return new ArrayList<Account>();
    }

    public Account changeAthority(Account acc) {
         Optional<Account> optional = accountRepository.findByUsername(acc.getUsername());
         if (optional.isPresent()) {

          Account account = optional.get();
          account.setAuthority(acc.getAuthority());
          accountRepository.save(account);
          return account;
         } else {
             throw new UsernameNotFoundException("No user found with username: " + acc.getUsername());
         }
    }


}
