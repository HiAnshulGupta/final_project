package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.modelmapper.ModelMapper;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.CustomerDTO;
import com.app.dto.LoginRequestDto;

import com.app.pojos.Bookings;
import com.app.pojos.Customer;
import com.app.pojos.Vendor;
import com.app.repository.BookingRepository;
import com.app.repository.CustomerRepository;
import com.app.repository.VendorRepository;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository cstmrRepo;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private VendorRepository vnd;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private BookingRepository book;
	
	@Override
	public List<CustomerDTO> getAllCustomerDetails()
	{
	
		return cstmrRepo.findAll().stream().map(e -> mapper.map(e, CustomerDTO.class)) // Entity --> DTO
				.collect(Collectors.toList());
	}
	
	@Override
	public Customer addNewCustomer(CustomerDTO cstmr)
	{
		String encPassword = passwordEncoder.encode(cstmr.getPassword());
		cstmr.setPassword(encPassword);
		Customer customers=mapper.map(cstmr,Customer.class);// DTO --> Entity
		return cstmrRepo.save(customers);
	}
	
	@Override
	public String deleteCustomer(@RequestBody Long id)
	{
		System.out.println("in delet "+id);
		cstmrRepo.deleteById(id);
		return "Customer Deleted Successfully";
	}

	@Override
	public Customer authenticateCustomer(LoginRequestDto dto) {
		
//		return cstmrRepo.findByEmailAndPassword(dto.getEmail(), dto.getPassword())
//				.orElseThrow(() -> new ResourceNotFoundException("wrong Credentials !!!!!"));
		
		Customer cx1= cstmrRepo.findByEmail(dto.getEmail())
				.orElseThrow(()-> new ResourceNotFoundException("Bad Credentials!!!"));
		
		
		String rawPassword=dto.getPassword();
		if(cx1!=null && passwordEncoder.matches(rawPassword, cx1.getPassword()))
				return cx1;
		else throw new ResourceNotFoundException("Wrong Email or Password");
	}

	@Override
	public Bookings addBooking(Long customerId, Long vendorID) {
		Customer customer=cstmrRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        Vendor vendor= vnd.findById(vendorID)
				.orElseThrow(()-> new ResourceNotFoundException("Service Not Found"));
        Bookings booking = new Bookings();
        booking.setCustdetail(customer);
        booking.setVendDetails(vendor);
        return book.save(booking);
	}

	@Override
	public List<Bookings> getAllBookingsById(Long customerId) {
		
		Customer customer = cstmrRepo.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
	    return customer.getBookingList();
		
		
	}

	@Override
	public Optional<Customer> getbyid(Long id) {
		
		return cstmrRepo.findById(id);
	}

	
	

	
	
}
