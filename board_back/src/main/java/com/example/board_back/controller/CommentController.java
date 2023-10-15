package com.example.board_back.controller;

import com.example.board_back.model.CommentModel;
import com.example.board_back.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/board")
public class CommentController {
    @Autowired
    CommentService commentService;

    @GetMapping("/comment/{id}")
    public ResponseEntity<?> read(@PathVariable long id) {
        System.out.println("여기는 실행됨");
        List<CommentModel> list = commentService.findCommentId(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/comment/add")
    public ResponseEntity<?> add(@RequestBody CommentModel commentModel) {
        commentService.add(commentModel);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/comment/delete/{id}&{boardId}")
    public ResponseEntity<?> delete(
            @PathVariable long id,
            @PathVariable long boardId) {
        System.out.println("딜리트 컨트롤러");
        commentService.delete(id,boardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
