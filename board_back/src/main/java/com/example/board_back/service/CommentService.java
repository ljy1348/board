package com.example.board_back.service;

import com.example.board_back.model.BoardModel;
import com.example.board_back.model.CommentModel;
import com.example.board_back.repository.BoardRepository;
import com.example.board_back.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    BoardRepository boardRepository;

    public List<CommentModel> findCommentId(long id) {
        List<CommentModel> list = commentRepository.findByBoardId(id);
        return list;
    }

    public void add(CommentModel commentModel) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<BoardModel> boardModel = boardRepository.findById(commentModel.getBoardId());
        if (boardModel.isPresent()) {BoardModel boardModel1 = boardModel.get();
                boardModel1.setCommentCount(boardModel1.getCommentCount()+1);
                boardRepository.save(boardModel1);}
        if (auth.getName().equals("anonymousUser")) commentModel.setCommentAuthor(null);
        else commentModel.setCommentAuthor(auth.getName());
        commentRepository.save(commentModel);
    }

    @Transactional
    public void delete(long id, long boardId) {
        Optional<BoardModel> optional = boardRepository.findById(boardId);
        if (optional.isPresent()) {
            BoardModel boardModel = optional.get();
            boardModel.setCommentCount(boardModel.getCommentCount()-1);
            boardRepository.save(boardModel);
        }
        System.out.println(id);
        commentRepository.deleteByCommentId(id);
    }
}
