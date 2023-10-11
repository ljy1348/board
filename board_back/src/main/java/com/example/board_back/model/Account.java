package com.example.board_back.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * packageName : com.example.board_back.model
 * fileName : UserModel
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
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Account {
    private Integer id;
    private String email;
    private String password;
    private String authority;
}
