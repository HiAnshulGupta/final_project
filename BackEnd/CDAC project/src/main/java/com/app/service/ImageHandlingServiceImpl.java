package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.pojos.Catalogue;
import com.app.repository.CatalogueRepository;





@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	// To tell SC , evaluate SpEL (spring expr language) n inject it's value -->
	// field
	@Value("${content.upload.folder}")
	private String folderName;
	// dep : dao layer i/f :
	@Autowired
	private CatalogueRepository catRepo;

	@PostConstruct
	public void myInit() {
		System.out.println("in myInit " + folderName);
		// chk of folder exists --o.w create one!
		File path = new File(folderName);
		if (!path.exists()) {
			path.mkdirs();
		} else
			System.out.println("folder already exists....");
	}

	@Override
	public ApiResponse uploadImage(Long catId, MultipartFile imageFile) throws IOException{
		// chk if emp exists by the id ?
		Catalogue cat = catRepo.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Emp Id : Image Uploading failed!!!!!!!!"));
		// valid emp : PERSISTENT --create complete path to the image
	//	Path targetPath=Paths.get(new File(folderName).getAbsolutePath()+ File.separator + imageFile.getOriginalFilename());
		String targetPath=folderName+File.separator+imageFile.getOriginalFilename();
		
		System.out.println(targetPath);
		//copy image file contents to the specified path
		Files.copy(imageFile.getInputStream(), Paths.get(targetPath), StandardCopyOption.REPLACE_EXISTING);
		//=> success
		//save image path in DB
		cat.setCat_image(targetPath);
		return new ApiResponse("Image Uploaded successfully!");
	}

	@Override
	public byte[] serveImage(Long catId) throws IOException {
		Catalogue category =catRepo.findById(catId).orElseThrow(()->new ResourceNotFoundException("Invalid!!!!!"));
		String path=category.getCat_image();
		if(path==null)
			throw new ResourceNotFoundException("Image does not exist!!!");
		return Files.readAllBytes(Paths.get(path));
	}

}
