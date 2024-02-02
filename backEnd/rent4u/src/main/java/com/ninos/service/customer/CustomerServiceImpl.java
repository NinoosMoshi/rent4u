package com.ninos.service.customer;

import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.ninos.mapper.BookCarMapper;
import com.ninos.mapper.CarMapper;
import com.ninos.model.dto.BookCarDTO;
import com.ninos.model.dto.CarDTO;
import com.ninos.model.dto.CarDtoListDTO;
import com.ninos.model.dto.SearchCarDTO;
import com.ninos.model.entity.BookCar;
import com.ninos.model.entity.Car;
import com.ninos.repository.BookCarRepository;
import com.ninos.repository.CarRepository;
import com.ninos.repository.UserRepository;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import com.ninos.model.entity.User;
import com.ninos.model.enums.BookCarStatus;




@RequiredArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService{

    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final CarMapper carMapper;
    private final BookCarMapper bookCarMapper;
    private final BookCarRepository bookCarRepository;


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

    @Override
    public CarDTO getCarById(long carId) {
        Optional<Car> optionalCar = carRepository.findById(carId);
//        return optionalCar.map(carMapper::entityToDto).orElse(null);
        if (optionalCar.isPresent()){
            return carMapper.entityToDto(optionalCar.get());
        }
        return null;
    }



    @Override
    public boolean bookCar(Long carId, BookCarDTO bookCarDTO) {
//        User  user = null;
//        Car car = null;

        Optional<Car> optionalCar = carRepository.findById(carId);
        Optional<User> optionalUser = userRepository.findById(bookCarDTO.getUserId());

        if(optionalCar.isPresent() && optionalUser.isPresent()){
            Car existingCar = optionalCar.get();
            BookCar bookCar = new BookCar();
            bookCar.setUser(optionalUser.get());
            bookCar.setCar(existingCar);
            bookCar.setBookCarStatus(BookCarStatus.PENDING);

            bookCar.setFromDate(bookCarDTO.getFromDate());
            bookCar.setToDate(bookCarDTO.getToDate());

            long diffInMilliSeconds = bookCarDTO.getToDate().getTime() - bookCarDTO.getFromDate().getTime();
            long days = TimeUnit.MILLISECONDS.toDays(diffInMilliSeconds);

            bookCar.setDays(days);
            bookCar.setPrice(existingCar.getPrice() * days);
            bookCarRepository.save(bookCar);

            return true;
        }
        else{
            return false;
        }

    }



    @Override
    public List<BookCarDTO> getBookingsByUserId(Long userId) {
        List<BookCar> bookings = bookCarRepository.findAllByUserId(userId);
//        return bookings.stream().map(bookCarMapper::bookCarEntityToDto).collect(Collectors.toList());
        return bookings.stream().map(bookCar -> bookCarMapper.bookCarEntityToDto(bookCar)).collect(Collectors.toList());
    }


}
