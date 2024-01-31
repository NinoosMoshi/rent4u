package com.ninos.service.customer;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.ninos.mapper.CarMapper;
import com.ninos.model.dto.CarDTO;
import com.ninos.model.dto.CarDtoListDTO;
import com.ninos.model.dto.SearchCarDTO;
import com.ninos.model.entity.Car;
import com.ninos.repository.CarRepository;
import com.ninos.repository.UserRepository;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;



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


    @Override
    public CarDtoListDTO searchCar(SearchCarDTO searchCarDTO) {
        Car car = new Car();
        car.setBrand(searchCarDTO.getBrand());
        car.setType(searchCarDTO.getType());
        car.setColor(searchCarDTO.getColor());

        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll()
                .withMatcher("brand", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("type", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("color", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

        Example<Car> carExample = Example.of(car,exampleMatcher);
        List<Car> carList = carRepository.findAll(carExample);
        CarDtoListDTO carDtoListDTO = new CarDtoListDTO();
        carDtoListDTO.setCarDTOList(carList.stream().map(carMapper::entityToDto).collect(Collectors.toList()));
        return carDtoListDTO;
    }

}
