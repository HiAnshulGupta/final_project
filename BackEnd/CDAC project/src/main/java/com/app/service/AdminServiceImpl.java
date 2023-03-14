package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.CustomerDTO;
import com.app.dto.LoginRequestDto;
import com.app.dto.VendorDTO;
import com.app.pojos.Admin;
import com.app.repository.AdminRepository;
import com.app.repository.CustomerRepository;
import com.app.repository.VendorRepository;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository admRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private VendorRepository VendorRepo;
	
	@Autowired
	private ModelMapper mapper; 
	
	@Autowired
	private CustomerRepository cstmrRepo;
	
	@Override
	public List<Admin> getAllAdminDetails()
	{
		return admRepo.findAll();
	}
	
	@Override
	public Admin addNewAdmin(Admin adm)
	{
		String encPassword = passwordEncoder.encode(adm.getPassword());
		adm.setPassword(encPassword);
		return admRepo.save(adm);
	}
	@Override
	public String deleteAdmin(@RequestBody Long id)
	{
		System.out.println("in delet "+id);
		admRepo.deleteById(id);
		return "Admin Deleted Successfully";
	}

	@Override
	public Admin authenticateAdmin(LoginRequestDto dto) {
	
		return admRepo.findByEmailAndPassword(dto.getEmail(), dto.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("wrong Credentials !!!!!"));
	}
	
	@Override
	public List<VendorDTO> getAllVendorDetails() {
		return VendorRepo.findAll().stream().map(e -> mapper.map(e, VendorDTO.class)) // Entity --> DTO
				.collect(Collectors.toList());

	}
	
	public List<CustomerDTO> getAllCustomerDetails()
	{
	
		return cstmrRepo.findAll().stream().map(e -> mapper.map(e, CustomerDTO.class)) // Entity --> DTO
				.collect(Collectors.toList());
	}
	
}
