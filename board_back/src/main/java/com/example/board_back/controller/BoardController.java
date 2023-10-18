package com.example.board_back.controller;

import com.example.board_back.model.BoardModel;
import com.example.board_back.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.domain.Sort.Direction.DESC;

@Slf4j
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
    public ResponseEntity<Object> getAll(@PageableDefault(sort = "id", direction = DESC) Pageable pageable) {
        List<BoardModel> list = boardService.boardList(pageable);
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
