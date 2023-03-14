package com.app.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CustomerDTO;
import com.app.dto.LoginRequestDto;
import com.app.pojos.Admin;
import com.app.pojos.Bookings;
import com.app.pojos.Customer;
import com.app.service.CustomerService;

@CrossOrigin(origins  = "http://localhost:3000")
@RestController
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	public CustomerService cstmr;

	public CustomerController() {
		System.out.println("in def ctor of "+getClass());
	}
	
	@GetMapping
	public List<CustomerDTO> getCustomer()
	{
		System.out.println("in get customer");
		 System.out.println(cstmr.getAllCustomerDetails());
		 return cstmr.getAllCustomerDetails();
	}
	
	@PostMapping
	public Customer saveCustomerDetails(@RequestBody CustomerDTO customer)
	{
		System.out.println("in save customer "+customer);
		return cstmr.addNewCustomer(customer);
	}
	
	@DeleteMapping("/{id}")
	public String deleteCustomer(@PathVariable Long id)
	{
		return cstmr.deleteCustomer(id);
	}
	
	@PostMapping("/signin")
	public Customer validateCustomer(@RequestBody LoginRequestDto dto)
	{
		System.out.println("in emp signin "+dto);
		return cstmr.authenticateCustomer(dto);
	}
	
	@PostMapping("/{customerId}/bookings/{vendrID}")
    public ResponseEntity<Void> addCustomerBooking(@PathVariable Long customerId, @PathVariable Long vendorID) {
		cstmr.addBooking(customerId, vendorID);
        return ResponseEntity.ok().build();
    }
	
	@GetMapping("/{customerId}/bookings")
	public List<Bookings> getBookingsForCustomer(@PathVariable Long customerId) {
		 return cstmr.getAllBookingsById(customerId);
//	    Customer customer = custRepo.findById(customerId).orElseThrow();
//	    return customer.getBookings();
	    
	}
	
	@GetMapping("/{id}")
	public Optional<Customer> findByid(@PathVariable Long id) {
		
		return cstmr.getbyid(id);
	}
	
	
}
