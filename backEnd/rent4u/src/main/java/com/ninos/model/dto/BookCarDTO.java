package com.ninos.model.dto;

import lombok.Data;

import java.util.Date;

import com.ninos.model.enums.BookCarStatus;


@Data
public class BookCarDTO {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private Date fromDate;
    private Date toDate;
    private Long days;
    private Long price;
    private BookCarStatus bookCarStatus;

    private Long userId;
    private Long carId;




}
