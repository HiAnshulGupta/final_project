package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.CatalogueDTO;

import com.app.pojos.Catalogue;
import com.app.pojos.Vendor;
import com.app.repository.CatalogueRepository;
import com.app.repository.VendorRepository;

@Service
@Transactional
public class CatalogueServiceImpl implements CatalogueService {
	
	@Autowired
	private CatalogueRepository ctlRepo;
	
	@Autowired
	private VendorRepository vendorRepo;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public List<Catalogue> getAllcatalogueDetails() {
		// TODO Auto-generated method stub
		return ctlRepo.findAll();
//		return ctlRepo.findAll().stream().map(e -> mapper.map(e, CatalogueDTO.class)) // Entity --> DTO
//				.collect(Collectors.toList());
	}

	@Override
	public Catalogue addNewCatalogueItem(CatalogueDTO ctl,Long vendorId) {
		// TODO Auto-generated method stub
		
		Vendor vnd =vendorRepo.findById(vendorId)
				.orElseThrow(()->new ResourceNotFoundException("wrong Id vendor!!!!!"));
		Catalogue catalogues=mapper.map(ctl,Catalogue.class);// DTO --> Entity
		catalogues.setVendors(vnd);
		System.out.println(catalogues);
		return ctlRepo.save(catalogues);
		
	}

	@Override
	public String deleteCatalogueItem(Long id) {
		// TODO Auto-generated method stub
		
		System.out.println("in impl " + id);
		ctlRepo.deleteById(id);
		return "Deleted Successfully";
		
	}

	@Override
	public Optional<Catalogue> getbyid(Long id) {
		// TODO Auto-generated method stub
		return ctlRepo.findById(id);
	}
		

}
