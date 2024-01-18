package com.ninos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class Rent4uApplication {

	public static void main(String[] args) {
		SpringApplication.run(Rent4uApplication.class, args);
	}

}
