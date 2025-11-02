package com.vampz.stocksprout;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RestController
public class StocksproutApplication {

	public static void main(String[] args) {
		SpringApplication.run(StocksproutApplication.class, args);
	}

    @GetMapping
    public String hello() {
        return "Hello World!";
    }

}
