package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.CustomerDTO;
import com.app.dto.LoginRequestDto;
import com.app.dto.VendorDTO;

import com.app.pojos.Catalogue;
import com.app.pojos.Customer;
import com.app.pojos.Vendor;

public interface VendorService {

	 List<VendorDTO> getAllVendorDetails(); 
		
	    Vendor addNewVendor(VendorDTO vendor);
		
		String deleteVendor(Long id);
		
		Vendor authenticateVendor(LoginRequestDto dto);
	
		Catalogue addNewcat(Long categoryId,Long vendorId);
		
//		CustomerDTO findByid(Customer cstmr);
		
		Optional<Vendor> findByid(Long id);
}
