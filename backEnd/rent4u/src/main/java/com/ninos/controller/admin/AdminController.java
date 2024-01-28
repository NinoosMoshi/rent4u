package com.ninos.controller.admin;

import lombok.RequiredArgsConstructor;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ninos.model.dto.CarDTO;
import com.ninos.service.admin.AdminService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;


    @PostMapping("/car")
    public ResponseEntity<CarDTO> addCar(@ModelAttribute CarDTO carDTO) {
        CarDTO carDTO1 = adminService.addCar(carDTO);
        return new ResponseEntity<>(carDTO1, HttpStatus.CREATED);
    }


}
