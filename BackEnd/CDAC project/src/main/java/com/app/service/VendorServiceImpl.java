package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.xml.catalog.Catalog;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.CustomerDTO;
import com.app.dto.LoginRequestDto;
import com.app.dto.VendorDTO;
import com.app.pojos.Catalogue;
import com.app.pojos.Customer;
import com.app.pojos.Vendor;
import com.app.repository.CatalogueRepository;
import com.app.repository.VendorRepository;

@Service
@Transactional
public class VendorServiceImpl implements VendorService {

	@Autowired
	private VendorRepository VendorRepo;

	@Autowired
	private ModelMapper mapper;
	@Autowired
	private CatalogueRepository ctlRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public List<VendorDTO> getAllVendorDetails() {
		return VendorRepo.findAll().stream().map(e -> mapper.map(e, VendorDTO.class)) // Entity --> DTO
				.collect(Collectors.toList());

	}

//	@Override
//	public Vendor addNewVendor(Vendor vendor)
//	{
//		return VendorRepo.save(vendor);
//	}

	@Override
	public Vendor addNewVendor(VendorDTO vendor) {
		
		String encPassword = passwordEncoder.encode(vendor.getPassword());
		vendor.setPassword(encPassword);

		Vendor vendors = mapper.map(vendor, Vendor.class);// DTO --> Entity
		return VendorRepo.save(vendors);
	}

	@Override
	public String deleteVendor(@RequestBody Long id) {
		System.out.println("in delet " + id);
		VendorRepo.deleteById(id);
		return "Vendor Deleted Successfully";
	}

	@Override
	public Vendor authenticateVendor(LoginRequestDto dto) {

//		return VendorRepo.findByEmail(dto.getEmail())
//				.orElseThrow(() -> new ResourceNotFoundException("wrong Credentials !!!!!"));
		
		Vendor vnd1= VendorRepo.findByEmail(dto.getEmail())
				.orElseThrow(()-> new ResourceNotFoundException("Bad Credentials!!!"));
		
		
		String rawPassword=dto.getPassword();
		if(vnd1!=null && passwordEncoder.matches(rawPassword, vnd1.getPassword()))
				return vnd1;
		else throw new ResourceNotFoundException("Wrong Email or Password");
	}

	@Override
	public Catalogue addNewcat(Long catalogId,Long vendorId) {
		// TODO Auto-generated method stub
		Catalogue catalogue=ctlRepo.findById(catalogId).orElseThrow(()->new ResourceNotFoundException("wrong Id catalogue !!!!!"));
		Vendor vnd =VendorRepo.findById(vendorId)
				.orElseThrow(()->new ResourceNotFoundException("wrong Id vendor!!!!!"));
				
//				Catalogue ctl=new Catalogue();
				catalogue.setVendors(vnd);
//				ctl.setVendors(vnd);
//				

		return ctlRepo.save(catalogue);
	}

	@Override
	public Optional<Vendor> findByid(Long id) {
		// TODO Auto-generated method stub
		return VendorRepo.findById(id);
	}

	

}
