package com.example.board_back.repository;

import com.example.board_back.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

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
public interface AccountRepository extends JpaRepository<Account,Long> {
}
