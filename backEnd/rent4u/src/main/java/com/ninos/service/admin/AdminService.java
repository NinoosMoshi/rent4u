package com.ninos.service.admin;


import java.io.IOException;
import java.util.List;

import com.ninos.model.dto.CarDTO;
import com.ninos.model.dto.CarDtoListDTO;
import com.ninos.model.dto.SearchCarDTO;

public interface AdminService {

    CarDTO addCar(CarDTO carDTO) throws IOException;

    List<CarDTO> getAllCars();

    CarDTO getCarById(Long id);

    boolean updateCar(Long carId, CarDTO carDTO) throws IOException;

    void deleteCar(Long id);


    CarDtoListDTO searchCar(SearchCarDTO searchCarDTO);

}
