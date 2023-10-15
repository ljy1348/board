package com.example.board_back.model;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CommentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long commentId;

    @Column(nullable = false)
    long boardId;

    @Column(nullable = false)
    String commentAuthor;

    @Column(nullable = false)
    String commentContent;
}
