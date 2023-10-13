package com.example.board_back.repository;

import com.example.board_back.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * packageName : com.example.board_back.repository
 * fileName : AccountRepository
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
public interface AccountRepository extends JpaRepository<Account,Long> {
    Optional<Account> findByUsername(String username);

    List<Account> findByAuthority(Account.Authority authority);
    List<Account> findByAuthorityIn(List<Account.Authority> list);




}
