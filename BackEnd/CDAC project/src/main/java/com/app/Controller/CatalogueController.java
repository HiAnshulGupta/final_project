package com.app.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.CatalogueDTO;
import com.app.pojos.Catalogue;

import com.app.service.CatalogueService;
import com.app.service.ImageHandlingService;


@RestController
@CrossOrigin(origins  = "http://localhost:3000")
@EnableAutoConfiguration
@RequestMapping("/catalogue")
public class CatalogueController {
	
	@Autowired 
	public CatalogueService ctlg;
	
	@Autowired
	private ImageHandlingService imageService;
	
	public CatalogueController() {
		
		System.out.println("in def ctor of "+getClass());
	}
	
	@GetMapping
	public List<Catalogue> getCatalogueItem()
	{
		System.out.println("in get catalogue");
		return ctlg.getAllcatalogueDetails();
	}
	
	@PostMapping("/{vendorId}")
	public Catalogue addNewCatalogueItem(@RequestBody CatalogueDTO cat,@PathVariable Long vendorId)
	{
		System.out.println("in save catalogue "+cat);
		return ctlg.addNewCatalogueItem(cat, vendorId);
	}
	
	@DeleteMapping("/{id}")
	public String deleteCatalogueItem(@PathVariable Long id)
	{
		System.out.println(id);
		return ctlg.deleteCatalogueItem(id);
	}
	
	@GetMapping(value = "/{catId}/image", produces = { MediaType.IMAGE_GIF_VALUE, 
 			MediaType.IMAGE_JPEG_VALUE,
 			MediaType.IMAGE_PNG_VALUE })
 	public ResponseEntity<?> serveImageFromServerSideFolder(@PathVariable Long catId) throws IOException {
 		System.out.println("in serve img " + catId);
 		return new ResponseEntity<>(imageService.serveImage(catId), HttpStatus.OK);
 	}
	
	
	@PostMapping(value="/{catId}/image_upload", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadImageToServerSideFolder(@PathVariable Long catId,
			@RequestParam MultipartFile imageFile) throws IOException{
		System.out.println("in upload img " + catId + " " + imageFile.getOriginalFilename());
		return new ResponseEntity<>(imageService.uploadImage(catId, imageFile), HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public Optional<Catalogue> findbyid(Long id) {
		
		return ctlg.getbyid(id);
	}

}
