package com.ninos.service.admin;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.ninos.exception.ResourceNotFoundException;
import com.ninos.mapper.CarMapper;
import com.ninos.model.dto.CarDTO;
import com.ninos.model.dto.CarDtoListDTO;
import com.ninos.model.dto.SearchCarDTO;
import com.ninos.model.entity.Car;
import com.ninos.repository.CarRepository;



@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final CarRepository carRepository;
    private final CarMapper carMapper;


    // add
    @Override
    public CarDTO addCar(CarDTO carDTO) throws IOException {
        Car car = carMapper.dtoToEntity(carDTO);
        Car savedCar = carRepository.save(car);
        return carMapper.entityToDto(savedCar);
    }


    // findAll
    @Override
    public List<CarDTO> getAllCars() {
        List<Car> cars = carRepository.findAll();
//        List<CarDTO> carDTOS = cars.stream().map(temp -> carMapper.entityToDto(temp)).collect(Collectors.toList());
        return cars.stream().map(carMapper::entityToDto).collect(Collectors.toList());
    }

    // findById
    @Override
    public CarDTO getCarById(Long id) {
        Car car = carRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("There is No Car Exists with Id: " + id));
        return carMapper.entityToDto(car);
    }


    // update
    @Override
    public boolean updateCar(Long carId, CarDTO carDTO) throws IOException {
        Optional<Car> optionalCar = carRepository.findById(carId);

        if(optionalCar.isPresent()){
            Car existingCar = optionalCar.get();
            if(carDTO.getImage() != null)
                existingCar.setImage(carDTO.getImage().getBytes());

            existingCar.setPrice(carDTO.getPrice());
            existingCar.setYear(carDTO.getYear());
            existingCar.setType(carDTO.getType());
            existingCar.setDescription(carDTO.getDescription());
            existingCar.setColor(carDTO.getColor());
            existingCar.setName(carDTO.getName());
            existingCar.setBrand(carDTO.getBrand());
            carRepository.save(existingCar);
            return true;
        } else{
            return false;
        }
    }


    // delete
    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }


    // search
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
