package com.ninos.controller.customer;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ninos.model.dto.CarDTO;
import com.ninos.model.dto.SearchCarDTO;
import com.ninos.service.customer.CustomerService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;


    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getAllCars(){
        List<CarDTO> cars = customerService.getAllCars();
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }


    @PostMapping("/car/search")
    public ResponseEntity<?> searchCar(@RequestBody SearchCarDTO searchCarDTO){
        return ResponseEntity.ok(customerService.searchCar(searchCarDTO));
    }



}
