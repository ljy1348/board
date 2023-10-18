package com.example.board_back.service;

import com.example.board_back.model.BoardModel;
import com.example.board_back.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    BoardRepository boardRepository;

    public void insert(BoardModel board) {
        boardRepository.save(board);
    }

    public Page<BoardModel> boardList(Pageable pageable) {
        Page<BoardModel> page = boardRepository.findAll(pageable);
        return page;
    }

    public Optional<BoardModel> findId(long id) {
        Optional<BoardModel> optional = boardRepository.findById(id);
        return optional;
    }

    public ResponseEntity<?> boardEdit(BoardModel boardModel) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Optional<BoardModel> optional = boardRepository.findById(boardModel.getId());
            if (optional.isPresent()) {
                BoardModel boardModel1 = optional.get();
                if (boardModel1.getAuthor().equals(auth.getName())) {
                    boardRepository.save(boardModel);
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("아이디가 일치하지 않습니다.",HttpStatus.FORBIDDEN);
                }
            } else {
                return new ResponseEntity<>("게시물을 찾을 수 없습니다.",HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("서버와 연결할 수 없습니다.",HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<?> boardDelete(long id) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Optional<BoardModel> optional = boardRepository.findById(id);
            if (optional.isPresent()) {
                BoardModel boardModel1 = optional.get();
                if (boardModel1.getAuthor().equals(auth.getName())) {
                    boardRepository.deleteById(id);
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("아이디가 일치하지 않습니다.",HttpStatus.FORBIDDEN);
                }
            } else {
                return new ResponseEntity<>("게시물을 찾을 수 없습니다.",HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("서버와 연결할 수 없습니다.",HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
