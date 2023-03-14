package com.app;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.app.config.SecurityConfig;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class event {

	public static void main(String[] args) {
		SpringApplication.run(event.class, args);
	}
	
	@Bean
	public ModelMapper configureMapper() {
		System.out.println("in config mapper...");
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return modelMapper;
	}
	
	

}
