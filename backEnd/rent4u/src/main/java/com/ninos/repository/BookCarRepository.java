package com.ninos.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ninos.model.entity.BookCar;

public interface BookCarRepository extends JpaRepository<BookCar,Long> {

    List<BookCar> findAllByUserId(Long userId);

}

