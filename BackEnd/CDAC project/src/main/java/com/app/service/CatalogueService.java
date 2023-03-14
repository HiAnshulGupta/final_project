package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.CatalogueDTO;
import com.app.pojos.Catalogue;


public interface CatalogueService {
	
	
	 List<Catalogue> getAllcatalogueDetails(); 
		
	  Catalogue addNewCatalogueItem(CatalogueDTO catlogue,Long vendorId);
		
		String deleteCatalogueItem(Long id);	
		
		 Optional<Catalogue> getbyid(Long id);

}
