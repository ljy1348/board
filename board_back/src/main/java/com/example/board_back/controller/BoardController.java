package com.example.board_back.controller;

import com.example.board_back.model.BoardModel;
import com.example.board_back.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @PutMapping("/up")
    public ResponseEntity<Object> upload(@RequestBody BoardModel boardModel) {
        BoardModel boardModel1 = boardModel;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boardModel1.setAuthor(auth.getName());
        boardService.insert(boardModel1);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<Object> getAll() {
        List<BoardModel> list = boardService.boardList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<Object> findId(@PathVariable long id) {
        Optional<BoardModel> optional = boardService.findId(id);
        if (optional.isPresent()) {
            return new ResponseEntity<>(optional.get(),HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
