package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.CustomerDTO;
import com.app.dto.LoginRequestDto;

import com.app.pojos.Bookings;
import com.app.pojos.Customer;

public interface CustomerService {

	
  List<CustomerDTO> getAllCustomerDetails(); 
	
  	Customer addNewCustomer(CustomerDTO cstmr);
	
	String deleteCustomer(Long id);	
	
	Customer authenticateCustomer(LoginRequestDto dto);
	
	Optional<Customer> getbyid(Long id);
	
	
	
	Bookings addBooking(Long customerId, Long vendorID);
	
	List<Bookings>getAllBookingsById(Long customerId);
	
}
