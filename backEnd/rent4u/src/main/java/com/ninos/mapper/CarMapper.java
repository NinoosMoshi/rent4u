package com.ninos.mapper;

import lombok.AllArgsConstructor;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.ninos.model.dto.CarDTO;
import com.ninos.model.entity.Car;

@AllArgsConstructor
@Service
public class CarMapper {


    public CarDTO entityToDto(Car car){
       CarDTO carDTO = new CarDTO();
       BeanUtils.copyProperties(car,carDTO);
       return carDTO;
    }


    public Car dtoToEntity(CarDTO carDTO){
       Car car = new Car();
       BeanUtils.copyProperties(carDTO,car);
       return car;
    }


}
