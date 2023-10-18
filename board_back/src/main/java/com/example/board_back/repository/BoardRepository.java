package com.example.board_back.repository;

import com.example.board_back.model.BoardModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface BoardRepository extends JpaRepository<BoardModel, Long> {

    Optional<BoardModel> findById(long id);

    List<BoardModel> findAllByOrderByIdDesc();

    Page<BoardModel> findAll(Pageable pageable);


}
