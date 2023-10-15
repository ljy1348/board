package com.example.board_back.repository;

import com.example.board_back.model.CommentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentModel, Long> {
    List<CommentModel> findByBoardId(long id);

    void deleteByCommentId(long id);
}
