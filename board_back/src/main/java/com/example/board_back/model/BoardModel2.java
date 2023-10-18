package com.example.board_back.model;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BoardModel2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String content;

    @Column(nullable = false)
    private String author;

    @CreationTimestamp
    private LocalDateTime insertDate;

    @UpdateTimestamp
    private LocalDateTime updateDate;

    @Column(columnDefinition = "int default 0")
    int vote;
    String attachmentsData;
    @Lob
    private String attachments;
    @Column(columnDefinition = "boolean default false")
    private boolean isPinned;
    @Column(columnDefinition = "int default 0")
    private int commentCount;
}
