package com.example.board_back.controller;

import com.example.board_back.jwt.JwtUtil;
import com.example.board_back.model.CommentModel;
import com.example.board_back.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/board")
public class CommentController {
    @Autowired
    CommentService commentService;

    @Autowired
    JwtUtil jwtUtil;

//    게시물의 댓글 전체 조회 함수
    @GetMapping("/comment/{id}")
    public ResponseEntity<?> read(@PathVariable long id) {
        List<CommentModel> list = commentService.findBoardId(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

//    게시물에 댓글 달기 함수
    @PostMapping("/user/comment/add")
    public ResponseEntity<?> add(@RequestBody CommentModel commentModel) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        log.info(commentModel.toString());
        if (commentModel.getIsReComment() > 0) {
            Optional<CommentModel> optional = commentService.findByCommentId(commentModel.getParentCommentId());
            if (optional.isPresent()) {
                CommentModel commentModel1 = optional.get();
                commentModel1.setParentCommentId(commentModel1.getCommentId());
                commentModel.setCommentAuthor(auth.getName());
                commentService.add(commentModel);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        commentModel.setCommentAuthor(auth.getName());
        CommentModel commentModel1 = commentService.add(commentModel);
        commentModel1.setParentCommentId(commentModel1.getCommentId());
        commentService.edit(commentModel1);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    게시물에 댓글 삭제 함수
    @DeleteMapping("/user/comment/delete/{id}")
    public ResponseEntity<?> delete(
            @PathVariable long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<CommentModel> optional = commentService.findByCommentId(id);
        CommentModel commentModel;
        if (optional.isPresent()) {
        commentModel = optional.get();
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (commentModel.getCommentAuthor().equals(auth.getName())){
        commentService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

//    게시물에 댓글 수정 함수
    @PutMapping("/user/comment/edit")
    public ResponseEntity<?> edit(@RequestBody CommentModel commentModel) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<CommentModel> list = commentService.findByCommentId(commentModel.getCommentId());
        if (list.isPresent()) {
        CommentModel commentModel1 = list.get();
        if (commentModel1.getCommentAuthor().equals(auth.getName())) {
        commentModel1.setCommentContent(commentModel.getCommentContent());
        commentService.edit(commentModel1);
        return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        }  else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
