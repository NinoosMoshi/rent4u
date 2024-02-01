package com.ninos.mapper;

import lombok.AllArgsConstructor;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.ninos.model.dto.BookCarDTO;
import com.ninos.model.entity.BookCar;
import com.ninos.model.entity.Car;

@AllArgsConstructor
@Service
public class BookCarMapper {


    public BookCarDTO bookCarEntityToDto(Car bookCar){
        BookCarDTO bookCarDTO = new BookCarDTO();
        BeanUtils.copyProperties(bookCar,bookCarDTO);
        return bookCarDTO;
    }


    public BookCar bookCarDtoToEntity(BookCarDTO bookCarDTO){
        BookCar bookCar = new BookCar();
        BeanUtils.copyProperties(bookCarDTO, bookCar);
        return bookCar;
    }


}
