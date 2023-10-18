package com.example.board_back.service;

import com.example.board_back.model.BoardModel;
import com.example.board_back.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public void insertBoard(BoardModel boardModel) {
        boardRepository.save(boardModel);
    }

}
