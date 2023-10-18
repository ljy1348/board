package com.example.board_back.controller;

import com.example.board_back.model.BoardModel;
import com.example.board_back.service.BoardService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.springframework.data.domain.Sort.Direction.DESC;

@Slf4j
@Controller
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @PostMapping("/user/up")
    public ResponseEntity<Object> upload(@RequestParam(name = "file", required = false) MultipartFile file, @RequestParam("board") String board) {
        byte[] byteFile = null;
        ObjectMapper objectMapper = new ObjectMapper();
        BoardModel boardModel;
        try {
            boardModel = objectMapper.readValue(board, BoardModel.class);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            byteFile = file.getBytes();
            boardModel.setAttachmentsData(file.getOriginalFilename());
        } catch (Exception e) {
            System.out.println(e);
        }
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boardModel.setAuthor(auth.getName());
        boardModel.setAttachments(byteFile);
        boardService.insert(boardModel);
        return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    public ResponseEntity<Object> getAll(@PageableDefault(sort = "id", direction = DESC) Pageable pageable) {
        Page<BoardModel> page = boardService.boardList(pageable);
        Map<String, Object> map = new HashMap<>();
        map.put("board", page.getContent());
        map.put("maxpage", page.getTotalPages());
        return new ResponseEntity<>(map, HttpStatus.OK);
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

    @GetMapping("/user/edit/{id}")
    public ResponseEntity<?> editById(@PathVariable long id) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Optional<BoardModel> optional = boardService.findId(id);
            if (optional.isPresent()) {
                BoardModel boardModel = optional.get();
                if (boardModel.getAuthor().equals(auth.getName())) {
                return new ResponseEntity<>(boardModel, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("본인이 작성한 게시물이 아닙니다.", HttpStatus.FORBIDDEN);
                }
            } else {
                return new ResponseEntity<>("게시물을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
                return new ResponseEntity<>("서버와 연결할 수 없습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PutMapping("/user/edit")
    public ResponseEntity<Object> edit(@RequestParam(name = "file", required = false) MultipartFile file, @RequestParam("board") String board) {
        byte[] byteFile = null;
        ObjectMapper objectMapper = new ObjectMapper();
        BoardModel boardModel;
        try {
            boardModel = objectMapper.readValue(board, BoardModel.class);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            byteFile = file.getBytes();
            boardModel.setAttachmentsData(file.getOriginalFilename());
        } catch (Exception e) {
            System.out.println(e);
        }
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Optional<BoardModel> optional = boardService.findId(boardModel.getId());
            BoardModel boardModel1 = optional.get();
            if (!boardModel1.getAuthor().equals(auth.getName())){
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
            boardModel.setInsertDate(boardModel1.getInsertDate());
            boardModel.setAuthor(auth.getName());
            boardModel.setAttachments(byteFile);
            boardService.insert(boardModel);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/user/delete/{id}")
    public ResponseEntity<?> boardDelete(@PathVariable long id) {
        return boardService.boardDelete(id);
    }

}
