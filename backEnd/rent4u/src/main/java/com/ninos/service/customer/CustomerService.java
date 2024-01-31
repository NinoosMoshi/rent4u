package com.ninos.service.customer;

import java.util.List;

import com.ninos.model.dto.CarDTO;
import com.ninos.model.dto.CarDtoListDTO;
import com.ninos.model.dto.SearchCarDTO;

public interface CustomerService {

    List<CarDTO> getAllCars();

    CarDtoListDTO searchCar(SearchCarDTO searchCarDTO);

}
