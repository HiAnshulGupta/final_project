package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;

public interface ImageHandlingService {

	ApiResponse uploadImage(Long catId, MultipartFile imageFile) throws IOException;
	
	byte[] serveImage(Long catId) throws IOException;


}
