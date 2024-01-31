package com.ninos.service.customer;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ninos.mapper.CarMapper;
import com.ninos.model.dto.CarDTO;
import com.ninos.model.entity.Car;
import com.ninos.repository.CarRepository;
import com.ninos.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService{

    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final CarMapper carMapper;


    @Override
    public List<CarDTO> getAllCars() {
        List<Car> cars = carRepository.findAll();
//        List<CarDTO> carDTOS = cars.stream().map(car -> carMapper.entityToDto(car)).collect(Collectors.toList());
//        return carDTOS;
        return cars.stream().map(carMapper::entityToDto).toList();
    }






}
