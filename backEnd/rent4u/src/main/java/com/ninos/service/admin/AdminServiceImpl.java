package com.ninos.service.admin;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.ninos.mapper.CarMapper;
import com.ninos.model.dto.CarDTO;
import com.ninos.model.entity.Car;
import com.ninos.repository.CarRepository;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final CarRepository carRepository;
    private final CarMapper carMapper;


    // add new car
    @Override
    public CarDTO addCar(CarDTO carDTO) {
        Car car = carMapper.dtoToEntity(carDTO);
        Car savedCar = carRepository.save(car);

        return carMapper.entityToDto(savedCar);
    }






}
