package com.example.board_back.repository;

import com.example.board_back.model.Account;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * packageName : com.example.board_back.repository
 * fileName : UserRepository
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
@Repository
public class AccountRepository {
    private Map<String, Account> accounts = new HashMap<>();
    public Account save(Account account) {
        Random random = new Random();
        account.setId(random.nextInt());
        accounts.put(account.getEmail(), account);
        return account;
    }
    public Account findByEmail(String username) {
        return accounts.get(username);
    }
}
