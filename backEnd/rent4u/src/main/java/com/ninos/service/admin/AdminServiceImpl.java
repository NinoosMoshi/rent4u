package com.ninos.service.admin;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

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


    // create new car
    @Override
    public CarDTO addCar(CarDTO carDTO) throws IOException {
        Car car = carMapper.dtoToEntity(carDTO);
        Car savedCar = carRepository.save(car);
        return carMapper.entityToDto(savedCar);
    }


    // get all cars
    @Override
    public List<CarDTO> getAllCars() {
        List<Car> cars = carRepository.findAll();
//        List<CarDTO> carDTOS = cars.stream().map(temp -> carMapper.entityToDto(temp)).collect(Collectors.toList());
        return cars.stream().map(carMapper::entityToDto).collect(Collectors.toList());
    }


}
