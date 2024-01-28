package com.ninos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ninos.model.entity.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
}
