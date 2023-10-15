package com.example.board_back.service;

import com.example.board_back.model.BoardModel;
import com.example.board_back.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<BoardModel> boardList() {
        List<BoardModel> list = boardRepository.findAllByOrderByIdDesc();
        return list;
    }

    public Optional<BoardModel> findId(long id) {
        Optional<BoardModel> optional = boardRepository.findById(id);
        return optional;
    }

    public void insertBoard(BoardModel boardModel) {
        boardRepository.save(boardModel);
    }

}
