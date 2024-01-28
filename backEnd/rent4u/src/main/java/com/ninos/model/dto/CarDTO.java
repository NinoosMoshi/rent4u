package com.ninos.model.dto;

import lombok.Data;
import java.util.Date;
import org.springframework.web.multipart.MultipartFile;


@Data
public class CarDTO {

    private Long id;
    private String brand;
    private String name;
    private String type;
    private String color;
    private Date year;
    private Long price;
    private String description;
    private MultipartFile image;

    private byte[] returnImage;

}
